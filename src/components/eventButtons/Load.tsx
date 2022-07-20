import { Button } from "@chakra-ui/react";
import { BothEvents, BothEventsFragment } from "../../generated/graphql";

interface LoadButtonProps {
  row: BothEventsFragment;
  onClick: () => void;
}

export const LoadButton: React.FC<LoadButtonProps> = ({ row, onClick }) => {
  return (
    <Button size={"sm"} colorScheme="blue" onClick={onClick}>
      Pridať
    </Button>
  );
};
