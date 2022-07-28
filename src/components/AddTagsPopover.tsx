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
  TagFragment,
  useCreateTagMutation,
  useGetTagsQuery,
} from "../generated/graphql";

interface AddTagsPopoverProps {
  children: React.ReactNode;
  selectedTags: TagFragment[];
  setSelectedTags: (tags: TagFragment[]) => void;
  allowAdding?: boolean;
}

export const AddTagsPopover: React.FC<AddTagsPopoverProps> = ({
  children,
  setSelectedTags,
  selectedTags,
  allowAdding = true,
}) => {
  const [{ data, fetching }] = useGetTagsQuery();
  const [filteredTags, setFilteredTags] = useState<TagFragment[]>([]);
  const [, createTag] = useCreateTagMutation();
  const [newTagName, setNewTagName] = useState("");

  const filterTags = (search: string) => {
    if (data?.getTags) {
      setFilteredTags(
        data.getTags.filter((tag) => {
          if (search == "") {
            return tag;
          }
          return tag.name
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase());
        })
      );
    }
  };

  const checkIfChecked = (tag: TagFragment) => {
    const isChecked = selectedTags.some((item, index) => {
      return item.id === tag.id;
    });
    return isChecked;
  };

  useEffect(() => {
    console.log("popover", selectedTags);
    if (data?.getTags) {
      setFilteredTags(data.getTags);
    }
  }, [data]);

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Tagy</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody overflow="scroll" maxH={300}>
            {fetching ? (
              <Text>loading...</Text>
            ) : (
              <VStack alignItems="flex-start">
                <Input
                  placeholder="Vyhladať"
                  onChange={(e) => {
                    filterTags(e.target.value);
                  }}
                />
                {filteredTags.map((tag, index) => (
                  <Checkbox
                    key={index}
                    isChecked={checkIfChecked(tag)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTags([...selectedTags, tag]);
                      } else {
                        setSelectedTags(
                          selectedTags.filter(
                            (item, index) => item.id !== tag.id
                          )
                        );
                      }
                    }}
                  >
                    {tag.name}
                  </Checkbox>
                ))}
              </VStack>
            )}
          </PopoverBody>
          {allowAdding && (
            <PopoverFooter>
              <Flex alignItems="center">
                <Input
                  variant="unstyled"
                  placeholder="Nový tag"
                  value={newTagName}
                  onChange={(e) => {
                    setNewTagName(e.target.value);
                  }}
                />
                <IconButton
                  aria-label="add tag"
                  size="sm"
                  icon={<AddIcon />}
                  onClick={() => {
                    createTag({ name: newTagName });
                    setNewTagName("");
                  }}
                  mr={2}
                />
              </Flex>
            </PopoverFooter>
          )}
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
