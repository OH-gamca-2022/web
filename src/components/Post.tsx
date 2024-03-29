import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  LinkBox,
  Text,
  Link,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { PostSnippetFragment } from "../generated/graphql";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { dateToString } from "../utils/dateFormatter";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { Card } from "./Card";
import { TagButton } from "./TagButton";

interface PostProps {
  post: PostSnippetFragment;
}
dayjs.extend(calendar);

export const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <Card flex={1}>
      <Flex justifyContent={"center"} flexDirection={"column"}>
        <NextLink href={`/post/${post.id}`}>
          <Link color="#ddd">
            <Heading>{post.title}</Heading>
          </Link>
        </NextLink>
        <Text color={"#919191"} pb={3}>
          {post.subtitle}
        </Text>
        <Box overflowWrap="anywhere" alignItems="center">
          <Wrap overflow="hidden" float="left" position="relative">
            {post.tags?.map((tag, index) => (
              <WrapItem key={index}>
                <TagButton tag={tag} />
              </WrapItem>
            ))}
          </Wrap>
          <Text float="right" position="relative" ml={4} color="white">
            {dateToString(new Date(post.publishDate), false)}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};
