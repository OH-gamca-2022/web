import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  LinkBox,
  Text,
  Link,
} from "@chakra-ui/react";
import { PostSnippetFragment } from "../generated/graphql";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { dateToString } from "../utils/dateFormatter";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { Card } from "./Card";

interface PostProps {
  post: PostSnippetFragment;
}
dayjs.extend(calendar);

export const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <Card>
      <Flex justifyContent={"center"} flexDirection={"column"}>
        <NextLink href={`/post/${post.id}`}>
          <Link>
            <Heading>{post.title}</Heading>
          </Link>
        </NextLink>
        <Text pb={3}>{post.subtitle}</Text>
        <Flex
          flexDirection="row"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <HStack>
            {post.tags?.map((tag, index) => (
              <Button key={index} size={"sm"}>
                {tag.name}
              </Button>
            ))}
          </HStack>
          <Text>{dateToString(new Date(post.publishDate), false)}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};
