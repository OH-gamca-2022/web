import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { useGetPostQuery } from "../../generated/graphql";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import style from "../../styles/github-markdown-css-dark.module.css";
import { Card } from "../../components/Card";
import { TagButton } from "../../components/TagButton";

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
      <Card mb={4}>
        <Stack>
          <Heading color="#ddd">{data.getPost.title}</Heading>
          <Wrap>
            {data.getPost.tags?.map((tag, index) => (
              <TagButton key={index} tag={tag} />
            ))}
          </Wrap>
          <Text color="#919191">{data.getPost.subtitle}</Text>
        </Stack>
      </Card>
      <Card>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className={style.markdownBody}
        >
          {data.getPost.text}
        </ReactMarkdown>
      </Card>
    </Layout>
  );
};

export default Post;
