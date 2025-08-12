import { Button } from "@heroui/react";
import { ReactNode, useState, useRef, useLayoutEffect } from "react";

export function FlexColViewMore({
  children,
  collapsedHeight = 28,
  expandText = "Ver mais",
  collapseText = "Ver menos",
  classNames = { base: "", childrenWrapper: "" },
  padding = 2,
}: {
  children: ReactNode;
  padding?: number;
  className?: string;
  collapsedHeight?: number;
  expandText?: string;
  collapseText?: string;
  classNames?: FlexColViewMoreClassNames;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [didEverOverflow, setDidEverOverflow] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const hasOverflow = element.scrollHeight > collapsedHeight + 1;
    if (hasOverflow) {
      setDidEverOverflow(true);
    }

    element.style.setProperty("--full-height", `${element.scrollHeight}px`);
  }, [children, collapsedHeight]);

  return (
    <div
      className={`flex flex-col items-center w-full gap-2 ${classNames.base}`}
    >
      <div
        ref={containerRef}
        className={`${classNames.childrenWrapper} p-${padding} w-full flex flex-col gap-2 overflow-hidden transition-[max-height] duration-300 ease-in-out`}
        style={{
          maxHeight: isExpanded ? "var(--full-height)" : `${collapsedHeight}px`,
        }}
      >
        {children}
      </div>
      {didEverOverflow && (
        <Button
          size="sm"
          variant="light"
          color="primary"
          className="text-tiny font-semibold text-blue-600 hover:text-blue-800"
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? collapseText : expandText}
        </Button>
      )}
    </div>
  );
}

interface FlexColViewMoreClassNames {
  base?: string;
  childrenWrapper?: string;
}
