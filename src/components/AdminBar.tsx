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
      spacing={6}
    >
      <Heading size="md" mr={2}>
        Admin Panel
      </Heading>
      <NextLink href={"/admin/posts"}>
        <Link>Články</Link>
      </NextLink>
      <NextLink href={"/admin/disciplines"}>
        <Link>Disciplíny</Link>
      </NextLink>
    </HStack>
  );
};
