import { EventContentArg } from "@fullcalendar/react";
import { NextPage } from "next";
import { Calendar } from "../components/Calendar";
import { Layout } from "../components/Layout";

const CalendarPage: NextPage = () => {
  return (
    <Layout>
      <Calendar />
    </Layout>
  );
};

export default CalendarPage;
