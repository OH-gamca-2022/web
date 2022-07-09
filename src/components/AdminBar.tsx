import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import NextLink from "next/link";

export const AdminBar = () => {
  return (
    <HStack
      bg="white"
      p={2}
      alignItems="center"
      justifyContent="flex-start"
      w="100%"
    >
      <Heading size="md" mr={5}>
        Admin Panel
      </Heading>
      <NextLink href={"/admin/posts"}>
        <Link>Posts</Link>
      </NextLink>
    </HStack>
  );
};