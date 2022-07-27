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
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Pagination } from "../components/Pagination";
import { useRouter } from "next/router";
import { Card } from "../components/Card";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
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
    router.push(`/?page=${value}`, undefined, { shallow: true });
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
        <Card>
          <Heading>Sponzori</Heading>
        </Card>
      </Grid>
    </Layout>
  );
};

export default Home;
