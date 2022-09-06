import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";

const Album: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <Layout></Layout>;
};

export default Album;
