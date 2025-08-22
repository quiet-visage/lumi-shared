import { Button } from "@heroui/react";
import React, {
  useState,
  useRef,
  useLayoutEffect,
  ReactNode,
  useEffect,
} from "react";

export function FlexWrapViewMore({
  children,
  collapsedHeight = 29,
  expandText = "Ver mais",
  collapseText = "Ver menos",
  classNames = { base: "", childrenWrapper: "" },
  padding = 2,
  isOpen,
  onClose,
}: {
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  padding?: number;
  className?: string;
  collapsedHeight?: number;
  expandText?: string;
  collapseText?: string;
  classNames?: FlexColViewMoreClassNames;
}) {
  const isControlled = isOpen != undefined;

  const [internalIsExpanded, setInternalIsExpanded] = useState(false);
  const [didEverOverflow, setDidEverOverflow] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isExpanded = isControlled ? isOpen : internalIsExpanded;

  const handleToggle = () => {
    if (isControlled && onClose) {
      onClose();
    } else {
      setInternalIsExpanded(!internalIsExpanded);
    }
  };

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
        className={`${classNames.childrenWrapper} p-${padding} w-full flex flex-wrap gap-2 overflow-hidden transition-[max-height] duration-300 ease-in-out`}
        style={{
          maxHeight: isExpanded
            ? "var(--full-height)"
            : `calc(var(--spacing) * ${collapsedHeight + padding * 2})`,
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
          onPress={handleToggle}
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
