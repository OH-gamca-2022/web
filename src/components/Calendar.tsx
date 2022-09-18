import FullCalendar, { EventContentArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useGetEventsQuery, useGetMyEventsQuery } from "../generated/graphql";
// import "@fullcalendar/common/main.css"; // @fullcalendar/react imports @fullcalendar/common
import "@fullcalendar/daygrid/main.css"; // @fullcalendar/timegrid imports @fullcalendar/daygrid
import { Box, Flex, Text } from "@chakra-ui/react";
import { EventPopover } from "./EventPopover";
import { useEffect } from "react";

export const Calendar: React.FC = () => {
  const [{ data }] = useGetEventsQuery();
  useEffect(() => {
    console.log(data);
  });
  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <EventPopover event={eventContent.event.extendedProps.event}>
        <Flex overflow={"hidden"} color="#ddd">
          <Text fontWeight="bold" mr={1}>
            {eventContent.timeText}
          </Text>
          <Text>{eventContent.event.title}</Text>
        </Flex>
      </EventPopover>
    );
  };
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      locale="sk"
      firstDay={1}
      events={data?.getEvents.map((item, index) => {
        return {
          title: item.name,
          start: item.startDate as Date,
          end: item.endDate as Date,
          allDay: item.allDay,
          extendedProps: {
            event: item,
          },
        };
      })}
      eventColor="red"
      eventTimeFormat={{
        hour: "2-digit",
        minute: "2-digit",
        meridiem: false,
      }}
      eventContent={renderEventContent}
    />
  );
};

export default Calendar;
