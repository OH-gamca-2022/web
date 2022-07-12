import {
  Box,
  Heading,
  Stack,
  Wrap,
  WrapItem,
  Text,
  List,
  ListItem,
  UnorderedList,
  Link,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect } from "react";
import { Card } from "../../components/Card";
import { Layout } from "../../components/Layout";
import { useGetCategoriesQuery } from "../../generated/graphql";
import NextLink from "next/link";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const AdminDisciplines: NextPage = () => {
  const [{ data }] = useGetCategoriesQuery();

  useEffect(() => {
    console.log(data);
  });

  if (!data) {
    return <Heading>Loading...</Heading>;
  }

  return (
    <Layout>
      <Wrap>
        {data.getCategories.map((cat, index) => (
          <WrapItem key={index}>
            <Card>
              <Heading mb={2}>{cat.name}</Heading>
              <UnorderedList>
                {cat.disciplines?.map((disc, index) => (
                  <ListItem key={index}>
                    <Flex justifyContent="space-between" alignItems="center">
                      <NextLink href={`/discipline`}>
                        <Link>{disc.name}</Link>
                      </NextLink>
                      <Flex>
                        <IconButton
                          size="sm"
                          variant="unstyled"
                          icon={<EditIcon />}
                          aria-label="delete discipline"
                        />
                        <IconButton
                          color="red"
                          size="sm"
                          variant="unstyled"
                          icon={<DeleteIcon />}
                          aria-label="delete discipline"
                        />
                      </Flex>
                    </Flex>
                  </ListItem>
                ))}
              </UnorderedList>
            </Card>
          </WrapItem>
        ))}
      </Wrap>
    </Layout>
  );
};

export default AdminDisciplines;
