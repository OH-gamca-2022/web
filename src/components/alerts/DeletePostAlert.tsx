import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import React, { Children } from "react";

interface DeletePostAlertProps {
  children: (onOpen: () => void) => React.ReactNode;
  onDelete?: () => void;
}

export const DeletePostAlert: React.FC<DeletePostAlertProps> = ({
  children,
  onDelete,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.createRef<HTMLButtonElement>();

  const onDeletePress = () => {
    onClose();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <>
      {children(onOpen)}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Vymazať článok
            </AlertDialogHeader>

            <AlertDialogBody>
              Ste si istí? Túto akciu už nemôžete vrátiť.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Zrušiť
              </Button>
              <Button colorScheme="red" onClick={onDeletePress} ml={3}>
                Vymazať
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
