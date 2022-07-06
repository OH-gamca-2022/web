import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { PostSnippetFragment } from "../generated/graphql";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { dateToString } from "../utils/dateFormatter";

interface PostProps {
  post: PostSnippetFragment;
}
dayjs.extend(calendar);

export const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <Flex
      justifyContent={"center"}
      p={5}
      borderRadius={10}
      borderWidth={1}
      flexDirection={"column"}
    >
      <Heading>{post.title}</Heading>
      <Text pb={3}>{post.textSnippet}</Text>
      <Flex
        flexDirection="row"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Flex>
          {post.tags?.map((tag) => (
            <Button size={"sm"}>{tag.name}</Button>
          ))}
        </Flex>
        <Text>{dateToString(new Date(post.publishDate), false)}</Text>
      </Flex>
    </Flex>
  );
};
