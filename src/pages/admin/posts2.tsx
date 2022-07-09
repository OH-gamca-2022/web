import {
  Flex,
  Heading,
  Button,
  HStack,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { Layout } from "../../components/Layout";
import {
  useGetPostsQuery,
  useDeletePostMutation,
  useSavePostMutation,
  PostFragment,
} from "../../generated/graphql";
import NextLink from "next/link";
import DataTable, { TableColumn } from "react-data-table-component";
import { dateToString } from "../../utils/dateFormatter";
import { DeleteIcon } from "@chakra-ui/icons";
import { DeletePostAlert } from "../../components/alerts/DeletePostAlert";

const AdminPosts = () => {
  const [{ data: posts, fetching }] = useGetPostsQuery();
  const [, deletePost] = useDeletePostMutation();
  const [{ fetching: publishFetching }, savePost] = useSavePostMutation();
  const columns: TableColumn<PostFragment>[] = [
    {
      name: "Nadpis",
      selector: (row) => row.title,
      cell: (row) => (
        <NextLink href={`/admin/post/${row.id}`}>
          <Link>{row.title}</Link>
        </NextLink>
      ),
    },
    {
      name: "Podnadpis",
      selector: (row) => row.subtitle || "",
      grow: 2,
    },
    {
      name: "Tagy",
      cell: (row, index, column, id) => (
        <HStack overflow="scroll">
          {row.tags?.map((tag, index) => (
            <Button key={index} size={"sm"}>
              {tag.name}
            </Button>
          ))}
        </HStack>
      ),
      maxWidth: "500",
      grow: 2,
    },
    {
      name: "Dátum publikovania",
      selector: (row) => row.publishDate,
      format: (row) =>
        row.publishDate ? dateToString(new Date(row.publishDate), false) : "",
    },
    {
      name: "Publikované",
      cell: (row) => (
        <Button
          size={"sm"}
          isLoading={publishFetching}
          onClick={() => {
            savePost({
              title: row.title,
              subtitle: row.subtitle,
              id: row.id,
              published: row.published ? false : true,
              tagIds: row.tags?.map((tag) => tag.id),
            });
          }}
        >
          {row.published ? "Publikované" : "Publikovať"}
        </Button>
      ),
      center: true,
    },
    {
      name: "Vymazať",
      cell: (row) => (
        <DeletePostAlert
          onDelete={() => {
            deletePost({ id: row.id });
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
      ),
      center: true,
    },
  ];

  if (fetching || !posts) {
    return <Heading>Loading...</Heading>;
  }

  return (
    <Layout wide>
      <Flex mb={4} justifyContent="space-between" alignItems="center" px={4}>
        <Heading>Články</Heading>
        <NextLink href="/admin/post/create">
          <Button>Nový článok</Button>
        </NextLink>
      </Flex>
      <DataTable columns={columns} data={posts.getPosts as PostFragment[]} />
    </Layout>
  );
};

export default AdminPosts;
