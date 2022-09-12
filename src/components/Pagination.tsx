import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Button, HStack, IconButton } from "@chakra-ui/react";

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
        aria-label="go to first page"
        icon={<ArrowLeftIcon />}
        variant="outline"
        onClick={() => onClick(0)}
        borderColor={"#30363d"}
        _hover={{ bgColor: "#2b334e" }}
        _active={{ bgColor: "#2b334e" }}
      />
      <IconButton
        aria-label="go to next page"
        icon={<ChevronLeftIcon />}
        variant="outline"
        onClick={() => onClick(Math.max(page - 1, 0))}
        borderColor={"#30363d"}
        _hover={{ bgColor: "#2b334e" }}
        _active={{ bgColor: "#2b334e" }}
      />
      {[...Array(count).keys()].map((number, index) => (
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
      <IconButton
        aria-label="go to previous page"
        icon={<ChevronRightIcon />}
        variant="outline"
        onClick={() => onClick(Math.min(page + 1, count - 1))}
        borderColor={"#30363d"}
        _hover={{ bgColor: "#2b334e" }}
        _active={{ bgColor: "#2b334e" }}
      />
      <IconButton
        aria-label="go to first page"
        icon={<ArrowRightIcon />}
        variant="outline"
        onClick={() => onClick(count - 1)}
        borderColor={"#30363d"}
        _hover={{ bgColor: "#2b334e" }}
        _selected={{ bgColor: "#2b334e" }}
      />
    </HStack>
  );
};
