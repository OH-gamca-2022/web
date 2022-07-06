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
import { DeletePostMutationVariables } from "../generated/graphql";

dayjs.locale("sk");

const invalidateAllPosts = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  console.log(allFields);
  const fieldInfos = allFields.filter((info) => info.fieldName == "posts");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "posts", fi.arguments);
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
