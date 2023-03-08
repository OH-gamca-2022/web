import { Box, Flex, useDimensions } from "@chakra-ui/react";
import { NavBar } from "./NavBar";
import React, { createRef, useEffect } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { Footer } from "./Footer";

interface LayoutProps {
  children?: React.ReactNode;
  wide?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, wide = false }) => {
  return (
    <Flex flexDirection={"column"} minHeight="100vh" bg={"#040f1a"}>
      <LayoutGroup>
        <NavBar />
        <Box
          flex={1}
          as={motion.div}
          layout="position"
          mt={8}
          pb={200}
          mx="auto"
          w="90%"
          maxW={wide ? 2000 : 1000}
        >
          {children}
        </Box>

        <Footer />
      </LayoutGroup>
    </Flex>
  );
};
