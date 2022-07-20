import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import {
  createClient,
  fetchExchange,
  Provider,
  debugExchange,
  dedupExchange,
} from "urql";
import { ChakraProvider } from "@chakra-ui/react";
import "dayjs/locale/sk";
import dayjs from "dayjs";
import { cacheExchange, Cache } from "@urql/exchange-graphcache";
import {
  CreateCategoryMutation,
  CreateTagMutation,
  DeleteCategoryMutationVariables,
  DeleteDisciplineMutationVariables,
  DeletePostMutationVariables,
  GetCategoriesDocument,
  GetCategoriesQuery,
  GetTagsDocument,
  GetTagsQuery,
  TagFragment,
  TagFragmentDoc,
} from "../generated/graphql";

dayjs.locale("sk");

const invalidateAllPosts = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  console.log(allFields);
  const fieldInfos = allFields.filter((info) => info.fieldName == "getPosts");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "getPosts", fi.arguments);
  });
};

const invalidateAllCategories = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  console.log(allFields);
  const fieldInfos = allFields.filter(
    (info) => info.fieldName == "getCategories"
  );
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "getCategories", fi.arguments);
  });
};

const invalidateAllEvents = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  console.log(allFields);
  const fieldInfos = allFields.filter(
    (info) => info.fieldName == "getGoogleEvents"
  );
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "getGoogleEvents", fi.arguments);
  });
};

const client = createClient({
  url: `${process.env.BASE_URL}/api/graphql`,
  exchanges: [
    dedupExchange,
    cacheExchange({
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
          deleteCategory(_result, args, cache, info) {
            cache.invalidate({
              __typename: "Category",
              id: (args as DeleteCategoryMutationVariables).id,
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
        },
      },
    }),
    fetchExchange,
  ],
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider value={client}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
