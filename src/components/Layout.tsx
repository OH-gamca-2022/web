import { Box } from "@chakra-ui/react";
import { NavBar } from "./NavBar";
import React from "react";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box>
      <NavBar />
      <Box mt={8} mx="auto" w="100%" maxW={1000}>
        {children}
      </Box>
    </Box>
  );
};
