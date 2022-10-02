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
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import { createRef, useEffect, useLayoutEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  useGetResultsTagIdQuery,
} from "../generated/graphql";
import { AdminBar } from "./AdminBar";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/router";

export const NavBar: React.FC = () => {
  const router = useRouter();
  const [{ data }] = useGetCategoriesQuery();
  const session = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bigMenu = useBreakpointValue({
    base: false,
    md: true,
  });
  const [{ data: resultsTagId }] = useGetResultsTagIdQuery();

  const variants: Variants = {
    visible: {
      height: "auto",
      display: "flex",
      transition: { type: "tween", duration: bigMenu ? 0 : undefined },
      marginTop: bigMenu ? 0 : 10,
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
          <MenuItem
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            Odhlásiť sa
          </MenuItem>
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
      {data?.getCategories.map((item, index) => (
        <Box as={motion.div} key={index}>
          <Menu>
            <MenuButton
              as={Button}
              fontWeight="normal"
              variant="link"
              color="white"
              iconSpacing={0}
              _expanded={{ color: "white" }}
              _active={{ color: "white" }}
              rightIcon={<ChevronDownIcon />}
            >
              {item.name}
            </MenuButton>
            <MenuList bg={"#040f1a"} color="#ddd" borderColor={"#30363d"}>
              <MenuItem
                _hover={{ bgColor: "#2b334e" }}
                _focus={{ bgColor: "#2b334e" }}
                onClick={() =>
                  router.push({
                    pathname: "/posts",
                    query: {
                      tagIds: [item.tag.id],
                    },
                  })
                }
              >
                Novinky
              </MenuItem>
              <MenuItem
                _hover={{ bgColor: "#2b334e" }}
                _focus={{ bgColor: "#2b334e" }}
                onClick={() =>
                  router.push({
                    pathname: "/posts",
                    query: {
                      tagIds: [
                        item.tag.id,
                        resultsTagId?.getResultsTagId,
                      ] as string[],
                    },
                  })
                }
              >
                Výsledky
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      ))}
      <Box as={motion.div}>
        <NextLink href="/calendar">
          <Link color="white">
            <Text>Kalendár</Text>
          </Link>
        </NextLink>
      </Box>
      <Box as={motion.div}>
        <NextLink href="/ciphers/submit">
          <Link color="white">
            <Text>Šifrovačka</Text>
          </Link>
        </NextLink>
      </Box>
      {/* <Box as={motion.div}>
        <NextLink href="/gallery">
          <Link color="white">
            <Text>Fotky</Text>
          </Link>
        </NextLink>
      </Box> */}
      {!bigMenu && (
        <Box as={motion.div} layout={false}>
          {userButton}
        </Box>
      )}
    </Flex>
  );

  const navBarLeft = (
    <Flex
      alignItems="center"
      as={motion.div}
      layout={false}
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
          <Flex alignItems={"center"}>
            <img
              src={"/logo.svg"}
              height={50}
              width={50}
              color="white"
              style={{ fill: "white", marginRight: 10 }}
            />
            <Heading color="white" whiteSpace={"nowrap"}>
              HOKUS POKUS
            </Heading>
          </Flex>
        </Link>
      </NextLink>
    </Flex>
  );

  return (
    // Whole top part
    <Flex
      zIndex={2}
      position="sticky"
      top={0}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      {(session.data?.user.role == "EDITOR" ||
        session.data?.user.role == "ADMIN") && <AdminBar />}
      {/* NavBar container*/}
      <Flex
        as={motion.div}
        layout={!bigMenu}
        bg="black"
        justifyContent="center"
        flex={1}
        p={3}
        w="100%"
        overflow="hidden"
      >
        {/* Main navbar content */}
        <Flex
          flex={1}
          alignItems={{ base: "flex-start", md: "center" }}
          flexDirection={{ base: "column", md: "row" }}
        >
          {navBarLeft}
          {/* Animated menulist */}
          <Box
            as={motion.div}
            variants={variants}
            initial={bigMenu ? false : "hidden"}
            animate={bigMenu ? "visible" : isMenuOpen ? "visible" : "hidden"}
          >
            {menuList}
          </Box>
        </Flex>
        {bigMenu && (
          <Box as={motion.div} layout={false}>
            {userButton}
          </Box>
        )}
      </Flex>
    </Flex>
  );
};
