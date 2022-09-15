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
import DataTable, {
  createTheme,
  TableColumn,
} from "react-data-table-component";
import { dateToString } from "../../utils/dateFormatter";
import { DeleteIcon } from "@chakra-ui/icons";
import { DeleteAlert } from "../../components/alerts/DeleteAlert";
import { TagButton } from "../../components/TagButton";

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
      allowOverflow: false,
      wrap: true,
    },
    {
      name: "Tagy",
      cell: (row, index, column, id) => (
        <HStack overflow="clip">
          {row.tags?.map((tag, index) => (
            <TagButton key={index} tag={tag} />
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
          colorScheme={row.published ? "gray" : "blue"}
          color="#222"
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
        <DeleteAlert
          onDelete={() => {
            deletePost({ id: row.id });
          }}
          headerText="Vymazať článok"
          bodyText="Ste si istí? Túto akciu už nemôžete vrátiť."
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
        </DeleteAlert>
      ),
      center: true,
    },
  ];

  if (fetching || !posts) {
    return <Heading>Loading...</Heading>;
  }

  createTheme("myDark", {
    text: {
      primary: "#bbb",
      secondary: "#2aa198",
    },
    background: {
      default: "#040f1a",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#30363d",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  });

  return (
    <Layout wide>
      <Flex mb={4} justifyContent="space-between" alignItems="center" px={4}>
        <Heading color="#ddd">Články</Heading>
        <NextLink href="/admin/post/create">
          <Button>Nový článok</Button>
        </NextLink>
      </Flex>
      <DataTable
        style={{ backgroundColor: "#040f1a" }}
        columns={columns}
        data={posts.getPosts as PostFragment[]}
        responsive={false}
        theme="myDark"
      />
    </Layout>
  );
};

export default AdminPosts;
