import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useGetPublishedPostsQuery } from "../generated/graphql";
import { NavBar } from "../components/NavBar";
import { Layout } from "../components/Layout";
import { Post } from "../components/Post";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  Stack,
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
      limit: 3,
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
        <Stack>
          <UpcomingEvents />
          <Card>
            <Heading color={"#ddd"}>Sponzori</Heading>
            <Link>
              <Box bgColor={"black"}>
                <Image
                  src={"/sponsors/BK.svg"}
                  height={150}
                  width={150}
                  objectFit="contain"
                />
              </Box>
              <Image
                src={"/sponsors/B-SM.svg"}
                height={150}
                width={150}
                objectFit="contain"
              />

              <Image
                src={"/sponsors/Bratislava.svg"}
                height={150}
                width={150}
                objectFit="contain"
              />
              <Box bgColor={"black"}>
                <img src={"/sponsors/Skubla.svg"} height={100} width={200} />
              </Box>
              <img src={"/sponsors/stilus.svg"} height={150} width={150} />
            </Link>
          </Card>
        </Stack>
      </Grid>
    </Layout>
  );
};

export default Home;
