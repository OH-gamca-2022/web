import { Box, Button, Flex, Heading, IconButton, Link } from "@chakra-ui/react";
import { NextPage } from "next";
import DataTable, {
  createTheme,
  TableColumn,
} from "react-data-table-component";
import { Layout } from "../../components/Layout";
import {
  CipherFragment,
  useDeleteCipherMutation,
  useSaveCipherMutation,
  useGetAllCiphersQuery,
} from "../../generated/graphql";
import { useIsAdminPage } from "../../utils/useIsAdminPage";
import NextLink from "next/link";
import { dateToString } from "../../utils/dateFormatter";
import { DeleteAlert } from "../../components/alerts/DeleteAlert";
import { DeleteIcon } from "@chakra-ui/icons";

const adminCihpers: NextPage = () => {
  const [{ data }] = useGetAllCiphersQuery();
  const [{ fetching: publishFetching }, editCipher] = useSaveCipherMutation();
  const [, deleteCipher] = useDeleteCipherMutation();
  useIsAdminPage();

  const columns: TableColumn<CipherFragment>[] = [
    {
      name: "Nadpis",
      selector: (row) => row.name,
      cell: (row) => (
        <NextLink href={`/admin/cipher/${row.id}`}>
          <Link>{row.name}</Link>
        </NextLink>
      ),
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
            editCipher({
              name: row.name,
              id: row.id,
              published: row.published ? false : true,
              correctAnswer: row.correctAnswer,
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
            deleteCipher({ id: row.id });
          }}
          headerText="Vymazať šifru"
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
    <Layout>
      <Flex justifyContent={"space-between"}>
        <Heading color="#ccc">Šifry</Heading>
        <NextLink href="/admin/cipher/create">
          <Button>Nová šifra</Button>
        </NextLink>
      </Flex>
      <DataTable
        style={{ backgroundColor: "#040f1a" }}
        columns={columns}
        data={data?.getAllCiphers as CipherFragment[]}
        responsive={false}
        theme="myDark"
      />
    </Layout>
  );
};

export default adminCihpers;
