import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Stack,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { Layout } from "../../components/Layout";
import {
  useDeletePostMutation,
  useGetPostsQuery,
  useSavePostMutation,
} from "../../generated/graphql";
import { dateToString } from "../../utils/dateFormatter";
import NextLink from "next/link";
import { DeleteIcon } from "@chakra-ui/icons";
import { DeletePostAlert } from "../../components/alerts/DeletePostAlert";

const AdminPosts: NextPage = () => {
  const [{ data: posts }] = useGetPostsQuery();
  const [, deletePost] = useDeletePostMutation();
  const [{ fetching: publishFetching }, savePost] = useSavePostMutation();
  return (
    <Layout>
      <Flex mb={4} justifyContent="space-between" alignItems="center" px={4}>
        <Heading>Články</Heading>
        <NextLink href="/admin/post/create">
          <Button>Nový článok</Button>
        </NextLink>
      </Flex>
      <Table>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Podnadpis</Th>
            <Th>Tags</Th>
            <Th>Dátum publikovania</Th>
            <Th>Publikované</Th>
            <Th>Vymazať</Th>
          </Tr>
        </Thead>
        <Tbody>
          {posts?.getPosts.map((post, index) => (
            <Tr key={index}>
              <Th>
                <NextLink href={`/admin/post/${post.id}`}>
                  <Link>{post.title}</Link>
                </NextLink>
              </Th>
              <Th>{post.subtitle}</Th>
              <Th overflow={"scroll"}>
                <HStack>
                  {post.tags?.map((tag, index) => (
                    <Button key={index} size={"sm"}>
                      {tag.name}
                    </Button>
                  ))}
                </HStack>
              </Th>
              <Th>
                {post.publishDate
                  ? dateToString(new Date(post.publishDate), false)
                  : ""}
              </Th>
              <Th>
                <Button
                  isLoading={publishFetching}
                  onClick={() => {
                    savePost({
                      title: post.title,
                      subtitle: post.subtitle,
                      id: post.id,
                      published: post.published ? false : true,
                      tagIds: post.tags?.map((tag) => tag.id),
                    });
                  }}
                >
                  {post.published ? "Publikované" : "Publikovať"}
                </Button>
              </Th>
              <Th>
                <DeletePostAlert
                  onDelete={() => {
                    deletePost({ id: post.id });
                  }}
                >
                  {(onOpen) => (
                    <IconButton
                      onClick={onOpen}
                      icon={<DeleteIcon color="red" />}
                      aria-label="Delete post"
                      variant="outline"
                      borderColor="red"
                    />
                  )}
                </DeletePostAlert>
              </Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Layout>
  );
};

export default AdminPosts;
