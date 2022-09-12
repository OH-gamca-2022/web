import { Box, Text, useDimensions } from "@chakra-ui/react";
import { createRef, useRef } from "react";

export const Footer: React.FC = () => {
  return (
    <Box
      width={"100%"}
      bg={"#061626"}
      position={"absolute"}
      bottom={0}
      padding={5}
    >
      <Text color={"#ddd"}>© Copyright 2022 OH</Text>
    </Box>
  );
};
