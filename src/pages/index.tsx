import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session);
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
    </div>
  );
};

export default Home;
