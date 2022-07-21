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
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Card } from "../../../../components/Card";
import { LoadButton } from "../../../../components/eventButtons/Load";
import { SaveButton } from "../../../../components/eventButtons/Save";
import { Layout } from "../../../../components/Layout";
import { LoadEventModal } from "../../../../components/modals/LoadEventModal";
import {
  BothEventsFragment,
  CalendarEventFragment,
  useGetGoogleEventsQuery,
  useSaveEventMutation,
} from "../../../../generated/graphql";
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
    variables: { calendarId: id as string },
  });
  const [{ fetching: saveEventFetching }, saveEvent] = useSaveEventMutation();

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
      format: (row) => {
        return dayjs(row.googleEvent.startDate).format("DD/MM/YYYY HH:mm");
      },
      sortable: true,
    },
    {
      name: "Koniec",
      selector: (row) => row.googleEvent.endDate,
      format: (row) => {
        return dayjs(row.googleEvent.endDate).format("DD/MM/YYYY HH:mm");
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
              router.push(
                `/admin/events/load/event?googleId=${row.googleEvent.id}&calendarId=${id}`
              )
            }
          />
        ) : areEventsSame(row) ? (
          <Button size="sm">Uložené</Button>
        ) : (
          <SaveButton row={row} />
        ),
      center: true,
      sortable: true,
    },
  ];

  return (
    <Layout wide={true}>
      <Heading mb={4}>{name}</Heading>
      <DataTable
        defaultSortAsc={false}
        defaultSortFieldId={2}
        columns={columns}
        data={data?.getGoogleEvents as BothEventsFragment[]}
        noDataComponent={<Spinner />}
      />
    </Layout>
  );
};

export default AdminGoogleCalendar;
