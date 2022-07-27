import * as React from "react";

const useIsOverflow = (
  ref: React.RefObject<HTMLDivElement>,
  isVerticalOverflow: boolean = false,
  callback?: (hasOverflow: boolean) => void
) => {
  const [isOverflow, setIsOverflow] = React.useState<boolean | undefined>(
    undefined
  );

  React.useLayoutEffect(() => {
    const { current } = ref;
    const { clientWidth, scrollWidth, clientHeight, scrollHeight } = current!;

    const trigger = () => {
      const hasOverflow = isVerticalOverflow
        ? scrollHeight > clientHeight
        : scrollWidth > clientWidth;

      setIsOverflow(hasOverflow);

      if (callback) callback(hasOverflow);
    };

    if (current) {
      trigger();
    }
  }, [callback, ref, isVerticalOverflow]);

  return isOverflow;
};

export default useIsOverflow;
