import { Box, Flex, Text, useDimensions } from "@chakra-ui/react";
import Image from "next/image";
import { createRef, useRef } from "react";

export const Footer: React.FC = () => {
  return (
    <Box
      width={"100%"}
      height={200}
      bg={"#061626"}
      position={"absolute"}
      bottom={0}
      padding={8}
    >
      <Flex
        flex={1}
        mx="auto"
        w="90%"
        maxW={1000}
        flexDirection="column"
        alignItems={"center"}
      >
        <img src="/logo.svg" height={150} width={150} />
        <Flex>
          <a href="https://www.instagram.com/ohgamca2022/">
            <img
              src="/instagram_icon.svg"
              height={50}
              width={50}
              style={{ marginRight: 10 }}
            />
          </a>
          <a href="https://www.youtube.com/channel/UCWhl7qt21bEuCui1cFuiuDQ">
            <img src="/youtube_icon.svg" height={50} width={50} />
          </a>
        </Flex>
      </Flex>
    </Box>
  );
};
