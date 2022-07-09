import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import { useEffect } from "react";
import { AdminBar } from "./AdminBar";

export const NavBar: React.FC = () => {
  const session = useSession();
  const userButton =
    session.status == "authenticated" ? (
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {session.data?.user.name}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => signOut()}>Odhlásiť sa</MenuItem>
        </MenuList>
      </Menu>
    ) : (
      <Button onClick={() => signIn("azure-ad")}>Prihlásiť sa</Button>
    );
  return (
    <Flex
      zIndex={2}
      position="sticky"
      top={0}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      {session.data?.user.role == "ADMIN" && <AdminBar />}
      <Flex
        bg="black"
        p={3}
        alignItems="center"
        justifyContent="center"
        flex={1}
        w="100%"
      >
        <Flex flex={1} alignItems="center">
          <NextLink href="/">
            <Link>
              <Heading color="white">OH HOG Rider</Heading>
            </Link>
          </NextLink>
        </Flex>
        {userButton}
      </Flex>
    </Flex>
  );
};
