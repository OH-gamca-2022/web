import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Button, HStack, IconButton, Text } from "@chakra-ui/react";

interface PaginationProps {
  count: number;
  page: number;
  onChange: (value: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  count,
  page,
  onChange,
}) => {
  const onClick = (value: number) => {
    onChange(value);
  };
  return (
    <HStack>
      <IconButton
        aria-label="go to next page"
        icon={<ChevronLeftIcon color="#5d688e" boxSize={6} />}
        variant="outline"
        onClick={() => onClick(Math.max(page - 1, 0))}
        borderColor={"#30363d"}
        _hover={{ bgColor: "#2b334e" }}
        _active={{ bgColor: "#2b334e" }}
      />
      {page > 1 && <Text color="#5d688e">...</Text>}
      {[...Array(count).keys()]
        .slice(
          page == 0 ? 0 : page == count - 1 ? count - 3 : page - 1,
          page == 0 ? 3 : page == count - 1 ? undefined : page + 2
        )
        .map((number, index) => (
          <Button
            key={index}
            isActive={page == number}
            variant={"outline"}
            onClick={() => onClick(number)}
            borderColor={"#30363d"}
            textColor={"#5d688e"}
            _hover={{ bgColor: "#2b334e" }}
            _active={{ bgColor: "#2b334e" }}
          >
            {number + 1}
          </Button>
        ))}
      {page < count - 2 && <Text color="#5d688e">...</Text>}
      <IconButton
        aria-label="go to previous page"
        icon={<ChevronRightIcon color="#5d688e" boxSize={6} />}
        variant="outline"
        onClick={() => onClick(Math.min(page + 1, count - 1))}
        borderColor={"#30363d"}
        _hover={{ bgColor: "#2b334e" }}
        _active={{ bgColor: "#2b334e" }}
      />
    </HStack>
  );
};
