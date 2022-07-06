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
} from "@chakra-ui/react";
import { TagFragment, useGetTagsQuery } from "../generated/graphql";

interface AddTagsPopoverProps {
  children: React.ReactNode;
  selectedTags: TagFragment[];
  setSelectedTags: (tags: TagFragment[]) => void;
}

export const AddTagsPopover: React.FC<AddTagsPopoverProps> = ({
  children,
  setSelectedTags,
  selectedTags,
}) => {
  const [{ data, fetching }] = useGetTagsQuery();
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Tagy</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            {fetching ? (
              <Text>loading...</Text>
            ) : (
              <HStack>
                {data?.getTags.map((tag, index) => (
                  <Checkbox
                    isChecked={selectedTags.includes(tag)}
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
              </HStack>
            )}
          </PopoverBody>
          <PopoverFooter>This is the footer</PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
