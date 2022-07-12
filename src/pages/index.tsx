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
import { Flex, Heading, Stack } from "@chakra-ui/react";
import { Pagination } from "../components/Pagination";
import { useRouter } from "next/router";

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

  return (
    <Layout>
      <Stack>
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
    </Layout>
  );
};

export default Home;
