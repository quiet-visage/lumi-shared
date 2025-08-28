import { RefObject, useEffect, useLayoutEffect, useState } from "react";

// ref must be a table wrapper containing:
//
//   <div className="flex flex-col w-full h-full relative">
//     <div
//       ref={tableWrapperRef}
//       className="flex flex-col w-full h-full absolute"
//     >
//
// parents must have a height
export const useVirtualTableResize = (
  ref: RefObject<HTMLDivElement | null>
) => {
  const [tableHeight, setTableHeight] = useState(520);

  useEffect(() => {
    const updateHeight = () => {
      if (!ref.current) return;
      setTableHeight(ref.current.clientHeight);
      console.log(ref.current.clientHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [ref]);

  return {
    tableHeight,
  };
};

export const useVHTableSize = () => {
  const [tableHeight, setTableHeight] = useState(520);

  useLayoutEffect(() => {
    const updateHeight = () => {
      setTableHeight(window.innerHeight);
    };
    updateHeight();

    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return {
    tableHeight,
  };
};
