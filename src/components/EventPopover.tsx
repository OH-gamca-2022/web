import { AddIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  Button,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  HStack,
  Text,
  Flex,
  Checkbox,
  IconButton,
  VStack,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  CalendarEventFragment,
  TagFragment,
  useCreateTagMutation,
  useGetTagsQuery,
} from "../generated/graphql";
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
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader fontWeight="bold">{event.name}</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody overflow="scroll" maxH={300}>
            <Flex>
              <Text mr={1}>Od: </Text>
              <Text fontWeight="bold">
                {dateToString(new Date(event.startDate), !event.allDay)}
              </Text>
            </Flex>
            <Flex>
              <Text mr={1}>Do: </Text>
              <Text fontWeight="bold">
                {dateToString(new Date(event.endDate), !event.allDay)}
              </Text>
            </Flex>
          </PopoverBody>
          <PopoverFooter></PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
