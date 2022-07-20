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
  Stack,
  Heading,
  Flex,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { useState } from "react";
import {
  GoogleEventFragment,
  TagFragment,
  useCreateCategoryMutation,
  useSaveEventMutation,
} from "../../generated/graphql";
import { TagsInputField } from "../form/TagsInputField";

interface LoadEventModalProps {
  children: (onOpen: () => void) => React.ReactNode;
  googleEvent: GoogleEventFragment;
}

export const LoadEventModal: React.FC<LoadEventModalProps> = ({
  children,
  googleEvent,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [, saveEvent] = useSaveEventMutation();

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onAdd = () => {
    onClose();
  };
  return (
    <>
      {children(onOpen)}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pridať Kategóriu</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Heading>{googleEvent.name}</Heading>
              <Flex>
                <Text mr={4}>
                  {"Od: " +
                    dayjs(googleEvent.startDate).format("DD/MM/YYYY HH:mm")}
                </Text>
                <Text>
                  {"Do: " +
                    dayjs(googleEvent.endDate).format("DD/MM/YYYY HH:mm")}
                </Text>
              </Flex>
              <Formik
                initialValues={{ tags: [] }}
                onSubmit={(values) => {
                  saveEvent({
                    googleId: googleEvent.id,
                    name: googleEvent.name,
                    startDate: googleEvent.startDate,
                    endDate: googleEvent.endDate,
                    tagIds: values.tags.map((item) => (item as TagFragment).id),
                  });
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <TagsInputField name="tags" label="Tagy" />
                  </Form>
                )}
              </Formik>
            </Stack>
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
