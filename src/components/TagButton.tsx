import NextLink from "next/link";
import { Button } from "@chakra-ui/react";
import { TagFragment } from "../generated/graphql";

interface TagProps {
  tag: TagFragment;
}

export const TagButton: React.FC<TagProps> = ({ tag }) => {
  return (
    <NextLink href={`/posts?tagIds=${[tag.id]}`}>
      <Button
        size={"sm"}
        minW="unset"
        bgColor={"#1c2133"}
        color="#ddd"
        _hover={{ backgroundColor: "#2b334e" }}
      >
        {tag.name}
      </Button>
    </NextLink>
  );
};
