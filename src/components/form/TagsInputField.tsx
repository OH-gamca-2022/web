import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Flex, HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import { useField } from "formik";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { TagFragment, useGetTagsQuery } from "../../generated/graphql";
import { AddIcon, CloseIcon, Icon } from "@chakra-ui/icons";
import { AddTagsPopover } from "../AddTagsPopover";

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
  const [selectedTags, setSelectedTags] = useState<TagFragment[]>([]);
  const onChange = useCallback((value: TagFragment[]) => {
    console.log("onchange");
    setSelectedTags(value);
    helpers.setValue(value);
  }, []);

  useEffect(() => {
    setSelectedTags(field.value);
  }, [field]);

  return (
    <FormControl isInvalid={!!meta.error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <HStack>
        <AddTagsPopover setSelectedTags={onChange} selectedTags={selectedTags}>
          <IconButton icon={<AddIcon />} aria-label="add tags" size="sm" />
        </AddTagsPopover>
        {selectedTags.map((tag, index) => (
          <Flex
            key={index}
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
                onChange(
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
      </HStack>
      {meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
};
