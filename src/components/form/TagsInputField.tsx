import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Flex, HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import { useField } from "formik";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { TagFragment, useGetTagsQuery } from "../../generated/graphql";
import { AddIcon, CloseIcon, Icon } from "@chakra-ui/icons";
import { AddTagsPopover } from "../AddTagsPopover";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type TagsInputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

export const TagsInputField: React.FC<TagsInputFieldProps> = ({
  label,
  name,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const [{ data, fetching }] = useGetTagsQuery();
  const [selectedTags, setSelectedTags] = useState<TagFragment[]>([]);
  const onChange = useCallback((value: string) => {
    helpers.setValue(value);
  }, []);

  return (
    <FormControl isInvalid={!!meta.error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <HStack>
        {selectedTags.map((tag) => (
          <Flex
            justifyContent="flex-start"
            bg={"gray.100"}
            borderRadius={5}
            alignItems="center"
            p={1}
            px={2}
          >
            <Text mr={2}>{tag.name}</Text>
            <IconButton
              onClick={() => {
                setSelectedTags(
                  selectedTags.filter((item, index) => item.id !== tag.id)
                );
              }}
              aria-label="remove tag"
              icon={<CloseIcon />}
              bg="gray.200"
              size="xs"
            />
          </Flex>
        ))}
        <AddTagsPopover
          setSelectedTags={setSelectedTags}
          selectedTags={selectedTags}
        >
          <IconButton icon={<AddIcon />} aria-label="add tags" size="sm" />
        </AddTagsPopover>
      </HStack>
      {meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
};
