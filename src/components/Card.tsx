import { Box, BoxProps } from "@chakra-ui/react";

interface CardProps extends BoxProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = (props) => {
  return (
    <Box p={5} borderRadius={10} borderWidth={1} {...props}>
      {props.children}
    </Box>
  );
};
