import {
  Box,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
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
    pause: session.status == "authenticated",
  });

  console.log(allEvents, myEvents);

  const events = (myEvents?.getMyEvents || allEvents?.getEvents)?.filter(
    (item) => {
      return dayjs(item.startDate).isAfter(dayjs());
    }
  );

  events?.sort((a, b) => {
    if (dayjs(a.startDate).isBefore(dayjs(b.startDate))) {
      return -1;
    } else {
      return 1;
    }
  });

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

  const slicedEvents = groupedEvents?.slice(0, 5);

  return (
    <Card>
      <Stack>
        <Heading size="lg" color={"#ddd"}>
          Najbližšie udalosti
        </Heading>
        {slicedEvents?.map((item, index) => (
          <Box key={index}>
            <Heading size={"sm"} color={"#ddd"}>
              {dateToString(new Date(item.date), false)}
            </Heading>
            <UnorderedList>
              {item.events.map((event, index) => (
                <ListItem key={index} color={"#ccc"}>
                  <Text>{event.name}</Text>
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        ))}
      </Stack>
    </Card>
  );
};
