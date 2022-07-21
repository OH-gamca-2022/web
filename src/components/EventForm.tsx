import { Flex, Button, Box, Heading } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import {
  useGetGoogleEventQuery,
  useGetPostQuery,
  useGetSavedEventQuery,
  useSaveEventMutation,
  useSavePostMutation,
} from "../generated/graphql";
import { InputField } from "./form/InputField";
import { MDInputField } from "./form/MDInputField";
import "easymde/dist/easymde.min.css";
import { TagsInputField } from "./form/TagsInputField";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { dateFormat } from "../utils/constants";

interface EventFormProps {
  googleId?: string;
  calendarId?: string;
  id?: string;
}
export const EventForm: React.FC<EventFormProps> = ({
  googleId,
  calendarId,
  id,
}) => {
  const [{ data: googleEvent, fetching: googleEventFetching }] =
    useGetGoogleEventQuery({
      pause: !googleId,
      variables: { id: googleId as string, calendarId: calendarId as string },
    });
  const [{ data: savedEvent, fetching: savedEventFetching }] =
    useGetSavedEventQuery({
      pause: !id,
      variables: { id: id as string },
    });
  const [, saveEvent] = useSaveEventMutation();

  const router = useRouter();

  useEffect(() => {
    console.log("saveEvent", savedEvent);
  });

  if (googleEventFetching || savedEventFetching) {
    return <Heading>Loading...</Heading>;
  }

  if (!googleEvent?.getGoogleEvent && !savedEvent?.getSavedEvent) {
    return <Heading>Udalost nebola najdena</Heading>;
  }

  return (
    <Formik
      initialValues={{
        name:
          googleEvent?.getGoogleEvent.name ||
          savedEvent?.getSavedEvent.name ||
          "",
        startDate:
          googleEvent?.getGoogleEvent.startDate ||
          savedEvent?.getSavedEvent.startDate,
        endDate:
          googleEvent?.getGoogleEvent.endDate ||
          savedEvent?.getSavedEvent.endDate,
        tags: savedEvent?.getSavedEvent.tags || [],
      }}
      onSubmit={async (values) => {
        const tagIds = values.tags.map((tag) => tag.id);
        console.log(values);
        const result = await saveEvent({
          googleId:
            savedEvent?.getSavedEvent.googleId ||
            googleEvent?.getGoogleEvent.id ||
            "",
          name: values.name,
          startDate: values.startDate,
          endDate: values.endDate,
          allDay:
            googleEvent?.getGoogleEvent.allDay ||
            savedEvent?.getSavedEvent.allDay ||
            false,
          tagIds,
          id: savedEvent?.getSavedEvent.id || undefined,
        });
        if (result.error) {
          console.log(result.error);
        } else {
          router.back();
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField name="name" placeholder="názov" label="Názov" />
          <Box mt={4}>
            <InputField name="startDate" placeholder="od" label="Od:" />
          </Box>
          <Box mt={4}>
            <InputField name="endDate" placeholder="do" label="Do:" />
          </Box>
          <Box mt={4}>
            <TagsInputField label="Tagy" name="tags" />
          </Box>
          <Flex justifyContent="flex-end" mb={10}>
            <Button mt={4} isLoading={isSubmitting} type="submit">
              Uložiť
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
