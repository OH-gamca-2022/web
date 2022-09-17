import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useGetPublishedPostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Post } from "../components/Post";
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Link,
  Stack,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Pagination } from "../components/Pagination";
import { useRouter } from "next/router";
import { Card } from "../components/Card";
import { UpcomingEvents } from "../components/UpcomingEvents";

const Home: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [{ data, fetching, error }, fetchPosts] = useGetPublishedPostsQuery({
    variables: {
      page: page,
      limit: 10,
    },
  });

  useEffect(() => {
    setPage(
      router.query.page && typeof router.query.page == "string"
        ? parseInt(router.query.page)
        : 0
    );
  }, [router.query.page]);

  if (!data) {
    return <Heading>Loading...</Heading>;
  }

  const handleChange = (value: number) => {
    setPage(value);
    router.push(
      {
        query: {
          page: value,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  // "repeat(1, 1fr)"

  return (
    <Layout>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
        <GridItem colSpan={2}>
          <Stack w="100%">
            {data?.getPublishedPosts.posts.map((post, index) => (
              <Post post={post} key={index} />
            ))}
            <Flex justifyContent="center">
              <Pagination
                count={data.getPublishedPosts.numOfPages}
                page={page}
                onChange={handleChange}
              />
            </Flex>
          </Stack>
        </GridItem>
        <GridItem>
          <Stack>
            <UpcomingEvents />
            <Card>
              <Heading color={"#ddd"}>Sponzori</Heading>
              <VStack spacing={6} padding={2} mt={4}>
                <a href="https://bratislavskykraj.sk">
                  <img src={"/sponsors/BK.svg"} />
                </a>
                <Divider borderColor={"#30363d"} />
                <a href="https://www.staremesto.sk">
                  <img src={"/sponsors/B-SM.svg"} />
                </a>
                <Divider borderColor={"#30363d"} />
                <a href="https://bratislava.sk">
                  <img src={"/sponsors/Bratislava.svg"} />
                </a>
                <Divider borderColor={"#30363d"} />
                <a href="https://www.skubla.sk">
                  <img src={"/sponsors/Skubla.svg"} />
                </a>
                <Divider borderColor={"#30363d"} />
                <a href="https://www.stilus.sk/sk/">
                  <img src={"/sponsors/stilus.svg"} />
                </a>
              </VStack>
            </Card>
          </Stack>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Home;
