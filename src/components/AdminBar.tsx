import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import NextLink from "next/link";

export const AdminBar = () => {
  return (
    <Box
      bg="white"
      p={4}
      alignItems="center"
      justifyContent="center"
      w="100%"
      pl={20}
    >
      <NextLink href={"/admin/posts"}>
        <Link>Posts</Link>
      </NextLink>
    </Box>
  );
};
