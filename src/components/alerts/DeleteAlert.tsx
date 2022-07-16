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

interface DeleteAlertProps {
  headerText: string;
  bodyText: string;

  children: (onOpen: () => void) => React.ReactNode;
  onDelete?: () => void;
  cancelText?: string;
  deleteText?: string;
}

export const DeleteAlert: React.FC<DeleteAlertProps> = ({
  headerText,
  bodyText,
  children,
  onDelete,
  cancelText = "Zrušiť",
  deleteText = "Vymazať",
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
              {headerText}
            </AlertDialogHeader>

            <AlertDialogBody>{bodyText}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {cancelText}
              </Button>
              <Button colorScheme="red" onClick={onDeletePress} ml={3}>
                {deleteText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
