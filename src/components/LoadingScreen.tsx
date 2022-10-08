import { Flex, Spinner } from "@chakra-ui/react";
import { Layout } from "./Layout";

export const LoadingScreen = () => {
  return (
    <Layout>
      <Flex justifyContent={"center"} alignItems="center" width={"100%"}>
        <Spinner />
      </Flex>
    </Layout>
  );
};
