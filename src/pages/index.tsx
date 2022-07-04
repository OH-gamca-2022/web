import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useGetPublishedPostsQuery } from "../generated/graphql";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const [{ data, fetching }] = useGetPublishedPostsQuery();

  useEffect(() => {
    console.log(session);
    console.log(data);
  });

  return (
    <div className={styles.container}>
      <a
        onClick={() => {
          signIn("azure-ad");
        }}
      >
        Sign in with Microsoft
      </a>
      <text>{JSON.stringify(data?.getPublishedPosts)}</text>
    </div>
  );
};

export default Home;
