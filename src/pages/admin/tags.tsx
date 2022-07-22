import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { DeleteAlert } from "../../components/alerts/DeleteAlert";
import { Card } from "../../components/Card";
import { Layout } from "../../components/Layout";
import {
  useCreateTagMutation,
  useDeleteTagMutation,
  useEditTagMutation,
  useGetTagsQuery,
} from "../../generated/graphql";

const AdminTags: NextPage = () => {
  const [{ data, fetching, error }] = useGetTagsQuery();
  const [editedTagId, setEditedTagId] = useState<string | null>(null);
  const [editedTagName, setEditedTagName] = useState<string | null>(null);
  const [newTagName, setNewTagName] = useState("");
  const [, deleteTag] = useDeleteTagMutation();
  const [{ error: editTagError }, editTag] = useEditTagMutation();
  const [, addTag] = useCreateTagMutation();

  useEffect(() => {
    console.log(error, editTagError);
  });

  if (fetching) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <Card>
        <Stack>
          <Heading>Kategórie</Heading>
          {data?.getTags
            .filter((item) => Boolean(item.categoryId))
            .map((item, index) => (
              <Text>{item.name}</Text>
            ))}
          <Heading>Disciplíny</Heading>
          {data?.getTags
            .filter((item) => Boolean(item.disciplineId))
            .map((item, index) => (
              <Text>{item.name}</Text>
            ))}
          <Heading>Tagy</Heading>
          <HStack>
            <IconButton
              aria-label="add tag"
              icon={<AddIcon />}
              onClick={() => {
                addTag({ name: newTagName });
                setNewTagName("");
              }}
            />
            <Input
              placeholder="názov tagu"
              onChange={(e) => {
                setNewTagName(e.target.value);
              }}
            />
          </HStack>
          {data?.getTags
            .filter((item) => {
              if (!item.disciplineId && !item.categoryId) {
                return true;
              } else {
                return false;
              }
            })
            .map((item, index) => (
              <HStack key={index} alignItems="center">
                <Flex alignItems="center">
                  <IconButton
                    aria-label="edit tag"
                    icon={<EditIcon />}
                    variant="unstyled"
                    size={"sm"}
                    onClick={() => {
                      setEditedTagId(item.id);
                      setEditedTagName(item.name);
                    }}
                  />
                  <DeleteAlert
                    headerText="Vymazať tag"
                    onDelete={() => {
                      deleteTag({ id: item.id });
                    }}
                  >
                    {(onOpen) => (
                      <IconButton
                        aria-label="edit tag"
                        icon={<DeleteIcon />}
                        variant="unstyled"
                        size="sm"
                        color="red"
                        onClick={onOpen}
                      />
                    )}
                  </DeleteAlert>
                </Flex>
                {editedTagId == item.id ? (
                  <HStack alignItems="center">
                    <Input
                      placeholder="názov tagu"
                      value={editedTagName || ""}
                      onChange={(e) => {
                        setEditedTagName(e.target.value);
                      }}
                    />
                    <Button
                      onClick={() => {
                        editTag({ id: item.id, name: editedTagName || "" });
                        setEditedTagId(null);
                        setEditedTagName(null);
                      }}
                    >
                      Uložiť
                    </Button>
                  </HStack>
                ) : (
                  <Text>{item.name}</Text>
                )}
              </HStack>
            ))}
        </Stack>
      </Card>
    </Layout>
  );
};

export default AdminTags;
