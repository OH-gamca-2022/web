import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Heading,
  Wrap,
  Text,
  WrapItem,
  Button,
  Flex,
  HStack,
  Spinner,
  Tag,
  Select,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DataTable, {
  createTheme,
  TableColumn,
} from "react-data-table-component";
import { Card } from "../../../../components/Card";
import { LoadButton } from "../../../../components/eventButtons/Load";
import { SaveButton } from "../../../../components/eventButtons/Save";
import { Layout } from "../../../../components/Layout";
import { LoadEventModal } from "../../../../components/modals/LoadEventModal";
import {
  BothEventsFragment,
  CalendarEventFragment,
  useGetCategoriesQuery,
  useGetGoogleEventsQuery,
  useSaveEventMutation,
  useSetCategoryCalendarMutation,
} from "../../../../generated/graphql";
import { dateFormat } from "../../../../utils/constants";
import { useIsAdminPage } from "../../../../utils/useIsAdminPage";

const areEventsSame = (event: BothEventsFragment) => {
  const googleEvent = event.googleEvent;
  const savedEvent = event.savedEvent;
  if (
    googleEvent.name == savedEvent?.name &&
    dayjs(googleEvent.startDate).isSame(savedEvent.startDate) &&
    dayjs(googleEvent.endDate).isSame(savedEvent.endDate)
  ) {
    return true;
  } else {
    return false;
  }
};

const AdminGoogleCalendar: NextPage = () => {
  const router = useRouter();
  const { id, name } = router.query;
  const [{ data }] = useGetGoogleEventsQuery({
    pause: !id,
    variables: { calendarId: id as string },
  });
  const [{ data: categories }] = useGetCategoriesQuery();
  const [{ error }, setCategoryCalendar] = useSetCategoryCalendarMutation();

  const category = categories?.getCategories.find(
    (item) => item.googleCalendarId == id
  );

  useEffect(() => {
    console.log(error);
  });

  const columns: TableColumn<BothEventsFragment>[] = [
    {
      name: "Názov",
      selector: (row) => row.googleEvent.name,
      cell: (row) => {
        if (row.savedEvent && row.googleEvent.name !== row.savedEvent.name) {
          return (
            <HStack spacing={1}>
              <Text>{row.savedEvent.name}</Text>
              <Text>{" -> "}</Text>
              <Text color={"red"}>{row.googleEvent.name}</Text>
            </HStack>
          );
        } else {
          return row.googleEvent.name;
        }
      },
      sortable: true,
    },
    {
      name: "Začiatok",
      selector: (row) => row.googleEvent.startDate,
      cell: (row) => {
        if (
          row.savedEvent &&
          row.googleEvent.startDate !== row.savedEvent.startDate
        ) {
          return (
            <HStack spacing={1}>
              <Text>{dayjs(row.savedEvent.startDate).format(dateFormat)}</Text>
              <Text>{" -> "}</Text>
              <Text color={"red"}>
                {dayjs(row.googleEvent.startDate).format(dateFormat)}
              </Text>
            </HStack>
          );
        } else {
          return dayjs(row.googleEvent.startDate).format(dateFormat);
        }
      },
      sortable: true,
    },
    {
      name: "Koniec",
      selector: (row) => row.googleEvent.endDate,
      cell: (row) => {
        if (
          row.savedEvent &&
          row.googleEvent.endDate !== row.savedEvent.endDate
        ) {
          return (
            <HStack spacing={1}>
              <Text>{dayjs(row.savedEvent.endDate).format(dateFormat)}</Text>
              <Text>{" -> "}</Text>
              <Text color={"red"}>
                {dayjs(row.googleEvent.endDate).format(dateFormat)}
              </Text>
            </HStack>
          );
        } else {
          return dayjs(row.googleEvent.endDate).format(dateFormat);
        }
      },
      sortable: true,
    },
    {
      name: "Tagy",
      cell: (row, index, column, id) => (
        <HStack overflow="scroll">
          {row.savedEvent?.tags?.map((tag, index) => (
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
      name: "Uložiť",
      selector: (row) =>
        !row.savedEvent ? "Pridať" : areEventsSame(row) ? "Uložené" : "Uložiť",
      cell: (row) =>
        !row.savedEvent ? (
          <LoadButton
            row={row}
            onClick={() =>
              router.push({
                pathname: "/admin/events/load/event",
                query: {
                  googleId: row.googleEvent.id,
                  calendarId: id,
                  tagId: category?.tag.id,
                },
              })
            }
          />
        ) : areEventsSame(row) ? (
          <Button size="sm" color="#222">
            Uložené
          </Button>
        ) : (
          <SaveButton row={row} />
        ),
      center: true,
      sortable: true,
    },
  ];

  if (!id) {
    return (
      <Layout>
        <Heading>Kalendár nebol nájdený</Heading>
      </Layout>
    );
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
    <Layout wide={true}>
      <HStack align="center" alignItems="center">
        <Heading color="#ddd" pr={4}>
          {name}
        </Heading>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {category?.name || "Kategória"}
          </MenuButton>
          <MenuList bg={"#040f1a"} color="#ddd" borderColor={"#30363d"}>
            {categories?.getCategories.map((item, index) => (
              <MenuItem
                _hover={{ bgColor: "#2b334e" }}
                _focus={{ bgColor: "#2b334e" }}
                key={index}
                onClick={() => {
                  setCategoryCalendar({
                    categoryId: item.id,
                    calendarId: id as string,
                  });
                }}
              >
                {item.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </HStack>
      <DataTable
        defaultSortAsc={false}
        defaultSortFieldId={2}
        columns={columns}
        data={data?.getGoogleEvents as BothEventsFragment[]}
        noDataComponent={<Spinner />}
        theme="myDark"
      />
    </Layout>
  );
};

export default AdminGoogleCalendar;
