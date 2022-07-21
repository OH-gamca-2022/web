import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useGetEventsQuery } from "../generated/graphql";
import "@fullcalendar/common/main.css"; // @fullcalendar/react imports @fullcalendar/common
import "@fullcalendar/daygrid/main.css"; // @fullcalendar/timegrid imports @fullcalendar/daygrid

export const Calendar: React.FC = () => {
  const [{ data }] = useGetEventsQuery();
  console.log(data);
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      locale="sk"
      events={data?.getEvents.map((item, index) => {
        return {
          title: item.name,
          start: item.startDate as Date,
          end: item.endDate as Date,
          allDay: item.allDay,
        };
      })}
      eventTimeFormat={{
        hour: "2-digit",
        minute: "2-digit",
        meridiem: false,
      }}
    />
  );
};
