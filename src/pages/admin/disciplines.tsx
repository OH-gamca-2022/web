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
  Button,
  Input,
  HStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { Layout } from "../../components/Layout";
import {
  useDeleteDisciplineMutation,
  useGetCategoriesQuery,
  useCreateDisciplineMutation,
  useDeleteCategoryMutation,
} from "../../generated/graphql";
import NextLink from "next/link";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { DeleteAlert } from "../../components/alerts/DeleteAlert";
import { AddCategoryModal } from "../../components/modals/AddCategoryModal";

const AdminDisciplines: NextPage = () => {
  const [{ data }] = useGetCategoriesQuery();
  const [, deleteDiscipline] = useDeleteDisciplineMutation();
  const [, createDiscipline] = useCreateDisciplineMutation();
  const [newDiscipline, setNewDiscipline] = useState<{
    name: string;
    category: string;
  } | null>(null);
  const [, deleteCategory] = useDeleteCategoryMutation();

  useEffect(() => {
    console.log(data);
  });

  if (!data) {
    return <Heading>Loading...</Heading>;
  }

  return (
    <Layout>
      <Flex mb={4} justifyContent="space-between">
        <Heading>Disciplíny</Heading>
        <AddCategoryModal>
          {(onOpen) => <Button onClick={onOpen}>Pridať kategóriu</Button>}
        </AddCategoryModal>
      </Flex>
      <Wrap>
        {data.getCategories.map((cat, index) => (
          <WrapItem key={index}>
            <Card>
              <Flex alignItems="center" justifyContent="space-between">
                <Heading mb={2}>{cat.name}</Heading>
                <DeleteAlert
                  headerText="Vymazať kategóriu"
                  bodyText="Ste si isťí? Túto akciu už nemôžete vrátiť."
                  onDelete={() => deleteCategory({ id: cat.id })}
                >
                  {(onOpen) => (
                    <IconButton
                      color="red"
                      size="md"
                      variant="unstyled"
                      icon={<DeleteIcon />}
                      aria-label="delete discipline"
                      onClick={onOpen}
                    />
                  )}
                </DeleteAlert>
              </Flex>
              <Stack>
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
                            aria-label="edit discipline"
                          />
                          <DeleteAlert
                            headerText="Vymazať disciplínu"
                            bodyText="Ste si isťí? Túto akciu už nemôžete vrátiť."
                            onDelete={() => deleteDiscipline({ id: disc.id })}
                          >
                            {(onOpen) => (
                              <IconButton
                                color="red"
                                size="sm"
                                variant="unstyled"
                                icon={<DeleteIcon />}
                                aria-label="delete discipline"
                                onClick={onOpen}
                              />
                            )}
                          </DeleteAlert>
                        </Flex>
                      </Flex>
                    </ListItem>
                  ))}
                </UnorderedList>
                <HStack>
                  <Input
                    value={
                      newDiscipline?.category == cat.id
                        ? newDiscipline?.name || ""
                        : ""
                    }
                    placeholder="Nová disciplína"
                    onChange={(e) =>
                      setNewDiscipline({
                        name: e.target.value,
                        category: cat.id,
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        if (newDiscipline?.name) {
                          createDiscipline({
                            name: newDiscipline?.name,
                            categoryId: newDiscipline?.category,
                          });
                          setNewDiscipline(null);
                        }
                      }
                    }}
                  />
                  <IconButton
                    aria-label="Create discipline"
                    icon={<AddIcon />}
                    onClick={() => {
                      if (newDiscipline?.name) {
                        createDiscipline({
                          name: newDiscipline?.name,
                          categoryId: newDiscipline?.category,
                        });
                        setNewDiscipline(null);
                      }
                    }}
                  />
                </HStack>
              </Stack>
            </Card>
          </WrapItem>
        ))}
      </Wrap>
    </Layout>
  );
};

export default AdminDisciplines;
