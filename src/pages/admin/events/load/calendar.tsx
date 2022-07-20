import { Heading, Wrap, Text, WrapItem, Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Card } from "../../../../components/Card";
import { Layout } from "../../../../components/Layout";
import {
  BothEventsFragment,
  CalendarEventFragment,
  useGetGoogleEventsQuery,
  useSaveEventMutation,
} from "../../../../generated/graphql";

const AdminGoogleCalendar: NextPage = () => {
  const router = useRouter();
  const { id, name } = router.query;
  const [{ data }] = useGetGoogleEventsQuery({
    variables: { calendarId: id as string },
  });
  const [{ fetching: saveEventFetching }, saveEvent] = useSaveEventMutation();

  useEffect(() => {
    console.log(data);
    console.log(id);
  });

  const columns: TableColumn<BothEventsFragment>[] = [
    {
      name: "Názov",
      selector: (row) => row.googleEvent.name,
      format: (row) => {
        if (row.savedEvent && row.googleEvent.name !== row.savedEvent.name) {
          return `${row.savedEvent.name} -> ${row.googleEvent.name}`;
        } else {
          return row.googleEvent.name;
        }
      },
    },
    {
      name: "Začiatok",
      selector: (row) => row.googleEvent.startDate,
      format: (row) => {
        return dayjs(row.googleEvent.startDate).format("DD/MM/YYYY HH:mm");
      },
    },
    {
      name: "Koniec",
      selector: (row) => row.googleEvent.endDate,
      format: (row) => {
        return dayjs(row.googleEvent.endDate).format("DD/MM/YYYY HH:mm");
      },
    },
    {
      name: "Uložiť",
      cell: (row) => (
        <Button
          size={"sm"}
          isLoading={saveEventFetching}
          colorScheme={row.savedEvent ? "gray" : "blue"}
          onClick={() => {
            saveEvent({
              name: row.googleEvent.name,
              startDate: row.googleEvent.startDate,
              endDate: row.googleEvent.endDate,
              googleId: row.googleEvent.id,
            });
          }}
        >
          {row.savedEvent ? "Uložené" : "Pridať"}
        </Button>
      ),
      center: true,
    },
  ];

  return (
    <Layout wide={true}>
      <Heading mb={4}>{name}</Heading>
      <DataTable
        columns={columns}
        data={data?.getGoogleEvents as BothEventsFragment[]}
      />
    </Layout>
  );
};

export default AdminGoogleCalendar;
