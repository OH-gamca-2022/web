import { Box, BoxProps } from "@chakra-ui/react";

interface CardProps extends BoxProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = (props) => {
  return (
    <Box
      p={5}
      borderRadius={10}
      borderWidth={1}
      // borderColor={"#30363d"}
      borderColor={"#ccc"}
      // bgColor={"#04121e"}
      bgColor={"white"}
      {...props}
    >
      {props.children}
    </Box>
  );
};
