import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCreateCategoryMutation } from "../../generated/graphql";

interface AddCategoryModalProps {
  children: (onOpen: () => void) => React.ReactNode;
}

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [, createCategory] = useCreateCategoryMutation();

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onAdd = () => {
    createCategory({ name: newCategoryName });
    onClose();
  };
  return (
    <>
      {children(onOpen)}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pridať Kategóriu</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              onChange={(e) => {
                setNewCategoryName(e.target.value);
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3}>
              Zrušiť
            </Button>
            <Button colorScheme="blue" onClick={onAdd}>
              Pridať
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
