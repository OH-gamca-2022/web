import "../styles/globals.css";
import "../styles/calendar.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import {
  createClient,
  fetchExchange,
  Provider,
  debugExchange,
  dedupExchange,
  stringifyVariables,
} from "urql";
import { ChakraProvider } from "@chakra-ui/react";
import "dayjs/locale/sk";
import dayjs from "dayjs";
import { cacheExchange, Cache, Resolver } from "@urql/exchange-graphcache";
import { simplePagination } from "@urql/exchange-graphcache/extras";
import {
  CreateCategoryMutation,
  CreateTagMutation,
  DeleteCategoryMutationVariables,
  DeleteDisciplineMutationVariables,
  DeleteEventMutationVariables,
  DeletePostMutationVariables,
  DeleteTagMutationVariables,
  GetCategoriesDocument,
  GetCategoriesQuery,
  GetTagsDocument,
  GetTagsQuery,
  TagFragment,
  TagFragmentDoc,
} from "../generated/graphql";
import Head from "next/head";

dayjs.locale("sk");

const invalidateAllPosts = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName == "getPosts");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "getPosts", fi.arguments);
  });
};

const invalidateAllCategories = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter(
    (info) => info.fieldName == "getCategories"
  );
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "getCategories", fi.arguments);
  });
};

const invalidateAllEvents = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter(
    (info) => info.fieldName == "getGoogleEvents"
  );
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "getGoogleEvents", fi.arguments);
  });
};

export const myPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    const isItInCache = cache.resolve(
      cache.resolve(
        entityKey,
        `${fieldName}(${stringifyVariables(fieldArgs)})`
      ) as string,
      "getPhotosFromAlbum"
    );
    info.partial = !isItInCache;
    const results: string[] = [];

    let nextPageToken: string | null = null;

    fieldInfos.forEach((fi) => {
      console.log(fi);
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "photos") as string[];
      const _nextPageToken = cache.resolve(key, "nextPageToken");
      console.log(_nextPageToken);
      console.log(data);

      if (_nextPageToken) {
        nextPageToken = _nextPageToken as string;
      }
      results.push(...data);
    });

    return {
      __typename: "PhotoResponse",
      nextPageToken: nextPageToken,
      photos: results,
    };
  };
};

const client = createClient({
  url: `${process.env.BASE_URL}/api/graphql`,
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        BothEvents: () => null,
        PaginatedPosts: () => null,
        PhotoResponse: () => null,
      },
      updates: {
        Mutation: {
          deletePost(_result, args, cache, info) {
            cache.invalidate({
              __typename: "Post",
              id: (args as DeletePostMutationVariables).id,
            });
          },
          savePost(_result, args, cache, info) {
            invalidateAllPosts(cache);
          },
          saveEvent(_result, args, cache, info) {
            invalidateAllEvents(cache);
          },
          createTag(result: CreateTagMutation, args, cache, info) {
            cache.updateQuery(
              { query: GetTagsDocument },
              (data: GetTagsQuery | null) => {
                if (result.createTag) {
                  data?.getTags.push(result.createTag);
                }
                return data;
              }
            );
          },
          deleteDiscipline(_result, args, cache, info) {
            cache.invalidate({
              __typename: "Discipline",
              id: (args as DeleteDisciplineMutationVariables).id,
            });
          },
          deleteCategory(result, args, cache, info) {
            cache.invalidate({
              __typename: "Category",
              id: (args as DeleteCategoryMutationVariables).id,
            });
          },
          deleteTag(_result, args, cache, info) {
            cache.invalidate({
              __typename: "Tag",
              id: (args as DeleteTagMutationVariables).id,
            });
          },
          createDiscipline(_result, args, cache, info) {
            invalidateAllCategories(cache);
          },
          createCategory(result: CreateCategoryMutation, args, cache, info) {
            cache.updateQuery(
              { query: GetCategoriesDocument },
              (data: GetCategoriesQuery | null) => {
                if (result.createCategory) {
                  data?.getCategories.push(result.createCategory);
                }
                return data;
              }
            );
          },
          deleteEvent(_result, args, cache, info) {
            cache.invalidate({
              __typename: "CalendarEvent",
              id: (args as DeleteEventMutationVariables).id,
            });
          },
          setCategoryCalendar(result, args, cache, info) {
            invalidateAllCategories(cache);
          },
          answer(_result, args, cache, info) {
            cache.invalidate("Query", "getAnswersOfMyClass");
          },
          saveCipher(_result, args, cache, info) {
            cache.invalidate("Query", "getAllCiphers");
          },
        },
      },
    }),
    fetchExchange,
  ],
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>OH Hokus Pokus</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta name="theme-color" content="#000" />
      </Head>
      <SessionProvider session={session} basePath="/api/auth">
        <Provider value={client}>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
