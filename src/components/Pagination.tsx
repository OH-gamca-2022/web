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
      />
      <IconButton
        aria-label="go to first page"
        icon={<ChevronLeftIcon />}
        variant="outline"
        onClick={() => onClick(Math.min(page - 1, 0))}
      />
      {[...Array(count).keys()].map((number, index) => (
        <Button
          key={index}
          variant={page == number ? "solid" : "outline"}
          onClick={() => onClick(number)}
        >
          {number + 1}
        </Button>
      ))}
      <IconButton
        aria-label="go to first page"
        icon={<ChevronRightIcon />}
        variant="outline"
        onClick={() => onClick(Math.max(page + 1, count - 1))}
      />
      <IconButton
        aria-label="go to first page"
        icon={<ArrowRightIcon />}
        variant="outline"
        onClick={() => onClick(count - 1)}
      />
    </HStack>
  );
};
