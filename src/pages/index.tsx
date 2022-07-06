import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useGetPublishedPostsQuery } from "../generated/graphql";
import { NavBar } from "../components/NavBar";
import { Layout } from "../components/Layout";
import { Post } from "../components/Post";
import { Stack } from "@chakra-ui/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const [{ data, fetching }] = useGetPublishedPostsQuery();

  useEffect(() => {
    console.log(session);
    console.log(data);
  });

  return (
    <Layout>
      <Stack>
        {data?.getPublishedPosts.map((post, index) => (
          <Post post={post} />
        ))}
      </Stack>
    </Layout>
  );
};

export default Home;
