import { RefObject, useEffect, useLayoutEffect, useState } from "react";

export const useHasVerticalOverflow = (
  ref: RefObject<HTMLDivElement | null>
) => {
  const [result, setResult] = useState(false);

  useLayoutEffect(() => {
    if (!ref.current) {
      setResult(false);
      return;
    }

    const observe = new ResizeObserver(entries => {
      for (let entry of entries) {
        setResult(entry.target.scrollHeight > entry.target.clientHeight)
      }
    }
    

  }, [ref]);

  return result;
};
