import { Button } from "@chakra-ui/react";
import {
  BothEventsFragment,
  useSaveEventMutation,
} from "../../generated/graphql";

interface SaveButtonProps {
  row: BothEventsFragment;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ row }) => {
  const [{ fetching: saveEventFetching }, saveEvent] = useSaveEventMutation();
  return (
    <Button
      size={"sm"}
      isLoading={saveEventFetching}
      colorScheme="green"
      onClick={() => {
        saveEvent({
          name: row.googleEvent.name,
          startDate: row.googleEvent.startDate,
          endDate: row.googleEvent.endDate,
          googleId: row.googleEvent.id,
          id: row.savedEvent?.id,
        });
      }}
    >
      Uložiť
    </Button>
  );
};
