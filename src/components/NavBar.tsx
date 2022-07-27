import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  List,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import { createRef, useEffect, useLayoutEffect, useState } from "react";
import { Migration, NoNeedToReleaseEntityManagerError } from "typeorm";
import { useGetCategoriesQuery } from "../generated/graphql";
import { AdminBar } from "./AdminBar";
import { motion } from "framer-motion";

export const NavBar: React.FC = () => {
  const navBarRef = createRef<HTMLDivElement>();
  const userButtonRef = createRef<HTMLDivElement>();
  const [{ data }] = useGetCategoriesQuery();
  const session = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const [userButtonHeight, setUserButtonHeight] = useState(0);

  useLayoutEffect(() => {
    setHeight(navBarRef.current?.clientHeight || 0);
    setUserButtonHeight(userButtonRef.current?.clientHeight || 0);
  });

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

  const menuList = (
    <Flex
      flex={1}
      alignItems={{ base: "flex-start", md: "center" }}
      flexDirection={{ base: "column", md: "row" }}
      gap={4}
      display={{ base: isMenuOpen ? "flex" : "none", md: "flex" }}
    >
      {data?.getCategories.map((item) => (
        <NextLink href={`/`}>
          <Link color="white">
            <Text>{item.name}</Text>
          </Link>
        </NextLink>
      ))}
      <NextLink href="/calendar">
        <Link color="white">
          <Text>Kalendár</Text>
        </Link>
      </NextLink>
    </Flex>
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
      <Flex bg="black" justifyContent="center" flex={1} p={3} w="100%">
        <Flex
          flex={1}
          alignItems={{ base: "flex-start", md: "center" }}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Flex alignItems="center">
            <IconButton
              aria-label="menu"
              icon={<HamburgerIcon />}
              color="white"
              variant="unstyled"
              display={{ base: "block", md: "none" }}
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            />
            <NextLink href="/">
              <Link mr={4}>
                <Heading color="white" whiteSpace={"nowrap"}>
                  OH 2022
                </Heading>
              </Link>
            </NextLink>
          </Flex>
          {menuList}
        </Flex>
        {userButton}
      </Flex>
    </Flex>
  );
};
