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
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { generateURL } from "../utils/google-signin";

export const AdminBar = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      flex={1}
      w="100%"
      p={2}
      bg="white"
    >
      <HStack alignItems="center" justifyContent="flex-start" spacing={6}>
        <Heading size="md" mr={2}>
          Admin Panel
        </Heading>
        <NextLink href={"/admin/posts"}>
          <Link>Články</Link>
        </NextLink>
        <NextLink href={"/admin/disciplines"}>
          <Link>Disciplíny</Link>
        </NextLink>
        <NextLink href={"/admin/events"}>
          <Link>Udalosti</Link>
        </NextLink>
        <NextLink href={"/admin/tags"}>
          <Link>Tagy</Link>
        </NextLink>
        <NextLink href={"/admin/albums"}>
          <Link>Albumy</Link>
        </NextLink>
        <NextLink href={"/admin/ciphers"}>
          <Link>Šifry</Link>
        </NextLink>
        {session.data?.user.role == "ADMIN" && (
          <NextLink href={"/admin/users"}>
            <Link>Používatelia</Link>
          </NextLink>
        )}
      </HStack>
      {session.data?.user.role == "ADMIN" && (
        <Button
          size="sm"
          onClick={() => {
            router.push("/api/google-oauth");
          }}
        >
          Sign In with Google
        </Button>
      )}
    </Flex>
  );
};
