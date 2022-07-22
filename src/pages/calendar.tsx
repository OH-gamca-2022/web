import { EventContentArg } from "@fullcalendar/react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { Layout } from "../components/Layout";

const Calendar = dynamic(() => import("../components/Calendar"), {
  ssr: false,
});

const CalendarPage: NextPage = () => {
  return (
    <Layout>
      <Calendar />
    </Layout>
  );
};

export default CalendarPage;
