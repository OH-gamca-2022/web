import { Box } from "@chakra-ui/react";
import { NavBar } from "./NavBar";
import React from "react";
import { LayoutGroup, motion } from "framer-motion";

interface LayoutProps {
  children?: React.ReactNode;
  wide?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, wide = false }) => {
  return (
    <Box>
      <LayoutGroup>
        <NavBar />
        <Box
          as={motion.div}
          layout="position"
          mt={8}
          mx="auto"
          w="90%"
          maxW={wide ? 2000 : 1000}
        >
          {children}
        </Box>
      </LayoutGroup>
    </Box>
  );
};
