import { AddIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Text,
  Flex,
} from "@chakra-ui/react";
import { CalendarEventFragment } from "../generated/graphql";
import { dateToString } from "../utils/dateFormatter";

interface AddTagsPopoverProps {
  children: React.ReactNode;
  event: CalendarEventFragment;
}

export const EventPopover: React.FC<AddTagsPopoverProps> = ({
  children,
  event,
}) => {
  return (
    <Popover arrowShadowColor="#30363d">
      <PopoverTrigger>{children}</PopoverTrigger>
      <Portal>
        <PopoverContent bgColor="#04121e" borderColor={"#30363d"}>
          <PopoverArrow bgColor={"#04121e"} borderColor={"#30363d"} />
          <PopoverHeader fontWeight="bold" borderColor={"#30363d"} color="#ddd">
            {event.name}
          </PopoverHeader>
          <PopoverCloseButton color="#ddd" />
          <PopoverBody overflow="scroll" maxH={300}>
            <Flex>
              <Text mr={1} color="#ddd">
                Od:{" "}
              </Text>
              <Text fontWeight="bold" color="#ddd">
                {dateToString(new Date(event.startDate), !event.allDay)}
              </Text>
            </Flex>
            <Flex>
              <Text mr={1} color="#ddd">
                Do:{" "}
              </Text>
              <Text fontWeight="bold" color="#ddd">
                {dateToString(new Date(event.endDate), !event.allDay)}
              </Text>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
