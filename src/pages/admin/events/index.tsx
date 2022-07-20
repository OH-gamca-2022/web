import { Button, Flex, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { Layout } from "../../../components/Layout";
import NextLink from "next/link";

const AdminEvents: NextPage = () => {
  return (
    <Layout>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading>Udalosti</Heading>
        <NextLink href="/admin/events/load">
          <Button>Načítať udalosti</Button>
        </NextLink>
      </Flex>
    </Layout>
  );
};

export default AdminEvents;
