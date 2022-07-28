import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import {
  CalendarEventFragment,
  useGetEventsQuery,
  useGetMyEventsQuery,
} from "../generated/graphql";
import { dateToString } from "../utils/dateFormatter";
import { Card } from "./Card";

export const UpcomingEvents: React.FC = () => {
  const session = useSession();
  const [{ data: myEvents }] = useGetMyEventsQuery({
    pause: !session,
  });
  const [{ data: allEvents }] = useGetEventsQuery({
    pause: Boolean(session),
  });

  const events = (myEvents?.getMyEvents || allEvents?.getEvents)?.filter(
    (item) => {
      return dayjs(item.startDate).isAfter(dayjs());
    }
  );

  const groupedEvents = events?.reduce((group, event) => {
    const { startDate } = event;
    const existingDate = group.find((item) =>
      dayjs(item.date).isSame(dayjs(startDate), "day")
    );
    if (existingDate) {
      existingDate.events.push(event);
      group.pop();
      group.push(existingDate);
    } else {
      group.push({
        date: event.startDate,
        events: [event],
      });
    }
    return group;
  }, [] as { date: string; events: CalendarEventFragment[] }[]);
  return (
    <Card>
      <Stack>
        <Heading size="lg">Najbližšie udalosti</Heading>
        {groupedEvents?.map((item, index) => (
          <Box key={index}>
            <Heading size={"sm"}>
              {dateToString(new Date(item.date), false)}
            </Heading>
            {item.events.map((event, index) => (
              <Text key={index}>{event.name}</Text>
            ))}
          </Box>
        ))}
      </Stack>
    </Card>
  );
};
