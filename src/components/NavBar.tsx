import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import { createRef, useEffect, useLayoutEffect, useState } from "react";
import { useGetCategoriesQuery } from "../generated/graphql";
import { AdminBar } from "./AdminBar";
import { motion } from "framer-motion";

export const NavBar: React.FC = () => {
  const [{ data }] = useGetCategoriesQuery();
  const session = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bigMenu = useBreakpointValue({
    base: false,
    md: true,
  });

  const variants = {
    visible: {
      height: "auto",
      display: "flex",
      transition: { staggerChildren: 0.01, type: "tween" },
      marginTop: 10,
    },
    hidden: {
      height: 0,
      transitionEnd: { display: "none" },
      transition: { staggerChildren: 0.01, type: "tween" },
      marginTop: 0,
    },
  };

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
      overflow="hidden"
      ml={4}
      flex={1}
      alignItems={{ base: "flex-start", md: "center" }}
      flexDirection={{ base: "column", md: "row" }}
      gap={4}
      // display={{ base: isMenuOpen ? "flex" : "none", md: "flex" }}
    >
      {data?.getCategories.map((item) => (
        <Box as={motion.div}>
          <NextLink href={`/`}>
            <Link color="white">
              <Text>{item.name}</Text>
            </Link>
          </NextLink>
        </Box>
      ))}
      <Box as={motion.div}>
        <NextLink href="/calendar">
          <Link color="white">
            <Text>Kalendár</Text>
          </Link>
        </NextLink>
      </Box>
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
      <Flex
        as={motion.div}
        layout
        bg="black"
        justifyContent="center"
        flex={1}
        p={3}
        w="100%"
        overflow="hidden"
      >
        <Flex
          flex={1}
          alignItems={{ base: "flex-start", md: "center" }}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Flex
            alignItems="center"
            as={motion.div}
            layout
            bg="black"
            zIndex={2}
          >
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
          <Box
            as={motion.div}
            variants={variants}
            initial={bigMenu ? "visible" : "hidden"}
            animate={bigMenu ? "visible" : isMenuOpen ? "visible" : "hidden"}
          >
            {menuList}
          </Box>
        </Flex>
        <motion.div layout="position">{userButton}</motion.div>
      </Flex>
    </Flex>
  );
};
