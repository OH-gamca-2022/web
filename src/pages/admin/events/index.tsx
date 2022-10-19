import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { Layout } from "../../../components/Layout";
import NextLink from "next/link";
import {
  CalendarEventFragment,
  useDeleteEventMutation,
  useGetEventsQuery,
} from "../../../generated/graphql";
import dayjs from "dayjs";
import DataTable, {
  createTheme,
  TableColumn,
} from "react-data-table-component";
import { DeleteAlert } from "../../../components/alerts/DeleteAlert";
import { DeleteIcon } from "@chakra-ui/icons";
import { Calendar } from "../../../components/Calendar";
import { TagButton } from "../../../components/TagButton";
import { useIsAdminPage } from "../../../utils/useIsAdminPage";

const AdminEvents: NextPage = () => {
  useIsAdminPage();
  const [{ data }] = useGetEventsQuery();
  const [, deleteEvent] = useDeleteEventMutation();
  const columns: TableColumn<CalendarEventFragment>[] = [
    {
      name: "Názov",
      selector: (row) => row.name,
      cell: (row) => (
        <NextLink href={`/admin/event/${row.id}`}>
          <Link>{row.name}</Link>
        </NextLink>
      ),
      sortable: true,
    },
    {
      name: "Začiatok",
      selector: (row) => row.startDate,
      format: (row) => {
        return dayjs(row.startDate).format("DD/MM/YYYY HH:mm");
      },
      sortable: true,
    },
    {
      name: "Koniec",
      selector: (row) => row.endDate,
      format: (row) => {
        return dayjs(row.endDate).format("DD/MM/YYYY HH:mm");
      },
      sortable: true,
    },
    {
      name: "Tagy",
      cell: (row, index, column, id) => (
        <HStack overflow="scroll">
          {row.tags?.map((tag, index) => (
            <TagButton key={index} tag={tag} />
          ))}
        </HStack>
      ),
      maxWidth: "500",
      grow: 2,
    },
    {
      name: "Vymazať",
      cell: (row) => (
        <DeleteAlert
          onDelete={() => {
            deleteEvent({ id: row.id });
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
    button: {
      default: "#ccc",
      hover: "rgba(0,0,0,.08)",
      focus: "rgba(255,255,255,.12)",
      disabled: "#444",
    },
  });

  return (
    <Layout>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading color="#ddd">Udalosti</Heading>
        <NextLink href="/admin/events/load">
          <Button>Načítať udalosti</Button>
        </NextLink>
      </Flex>

      <DataTable
        columns={columns}
        data={data?.getEvents as CalendarEventFragment[]}
        theme="myDark"
        pagination
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        paginationPerPage={50}
      />
    </Layout>
  );
};

export default AdminEvents;
