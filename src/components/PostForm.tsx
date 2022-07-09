import { Flex, Button, Box, Heading } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useGetPostQuery, useSavePostMutation } from "../generated/graphql";
import { InputField } from "./form/InputField";
import { MDInputField } from "./form/MDInputField";
import "easymde/dist/easymde.min.css";
import { TagsInputField } from "./form/TagsInputField";

interface PostFormProps {
  id?: string;
}
export const PostForm: React.FC<PostFormProps> = ({ id }) => {
  const [{ data, fetching }] = useGetPostQuery({
    pause: !id,
    variables: { getPostId: id as string },
  });

  const [, savePost] = useSavePostMutation();
  const [publish, setPublish] = useState(false);

  useEffect(() => {
    if (data) {
      setPublish(data?.getPost.published);
    }
  }, [data]);

  useEffect(() => {
    console.log("update", id, data, fetching);
  });

  if (fetching) {
    return <Heading>Loading...</Heading>;
  }

  if (id && !data?.getPost) {
    return <Heading>Clanok nebol najdeny</Heading>;
  }

  return (
    <Formik
      initialValues={{
        title: data?.getPost.title || "",
        subtitle: data?.getPost.subtitle || "",
        text: data?.getPost.text || "",
        tags: data?.getPost.tags || [],
      }}
      onSubmit={async (values) => {
        const tagIds = values.tags.map((tag) => tag.id);
        console.log("tagIds", tagIds);
        const result = await savePost({
          ...values,
          published: publish,
          id: data?.getPost.id,
          tagIds,
        });
        console.log(result);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField name="title" placeholder="názov" label="Názov" />
          <Box mt={4}>
            <InputField name="subtitle" placeholder="popis" label="Popis" />
          </Box>
          <Box mt={4}>
            <TagsInputField label="Tagy" name="tags" />
          </Box>
          <Box mt={4}>
            <MDInputField name="text" placeholder="text" label="Text" />
          </Box>
          <Flex justifyContent="flex-end" mb={10}>
            <Button mt={4} isLoading={isSubmitting} type="submit">
              Uložiť
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
