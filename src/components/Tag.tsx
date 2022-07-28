import { CloseIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { TagFragment } from "../generated/graphql";

interface TagProps {
  onRemove: () => void;
  tag: TagFragment;
}

export const Tag: React.FC<TagProps> = ({ onRemove, tag }) => {
  return (
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
          onRemove();
        }}
        aria-label="remove tag"
        icon={<CloseIcon />}
        bg="gray.200"
        size="xs"
      />
    </Flex>
  );
};
