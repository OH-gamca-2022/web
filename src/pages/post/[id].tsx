import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { useGetPostQuery } from "../../generated/graphql";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import style from "../../styles/github-markdown-css.module.css";

const Post: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [{ data }] = useGetPostQuery({
    variables: { getPostId: id as string },
  });

  if (!data?.getPost) {
    return <Heading>Post was not found</Heading>;
  }
  return (
    <Layout>
      <Box borderWidth={1} p={4} borderRadius={15}>
        <Stack>
          <Heading>{data.getPost.title}</Heading>
          <HStack>
            {data.getPost.tags?.map((tag, index) => (
              <Button key={index} size={"sm"}>
                {tag.name}
              </Button>
            ))}
          </HStack>
          <Text>{data.getPost.subtitle}</Text>
          <Divider />
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className={style.markdownBody}
          >
            {data.getPost.text}
          </ReactMarkdown>
        </Stack>
      </Box>
    </Layout>
  );
};

export default Post;
