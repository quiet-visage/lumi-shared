import { Button } from "@heroui/react";
import React, {
  useState,
  useRef,
  useLayoutEffect,
  ReactNode,
  useEffect,
} from "react";

// You can use any height class you want here, just make sure it's `max-h-`

export function FlexWrapViewMore<T>({
  items,
  renderItem,
  className = "",
  rowMaxHeight = 28,
  padding = 2,
}: {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  rowMaxHeight?: number;
  padding?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // This effect now runs only ONCE on mount to set up the observer.
  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // The ResizeObserver will handle all subsequent size changes.
    const observer = new ResizeObserver(() => {
      // 1. Always update the CSS variable with the latest scrollHeight.
      // This is vital for the expanded state to be correct on window resize.
      element.style.setProperty("--full-height", `${element.scrollHeight}px`);

      // 2. Check for overflow ONLY if the component is not currently expanded.
      // We read the `data-expanded` attribute directly from the DOM to avoid stale state.
      const isCurrentlyExpanded = element.dataset.expanded === "true";
      if (!isCurrentlyExpanded) {
        const hasOverflow = element.scrollHeight > element.clientHeight + 1;
        setIsOverflowing(hasOverflow);
      }
    });

    observer.observe(element);

    // Manually run the logic once on initial mount
    // to set the correct initial state.
    element.style.setProperty("--full-height", `${element.scrollHeight}px`);
    const initialHasOverflow = element.scrollHeight > element.clientHeight + 1;
    setIsOverflowing(initialHasOverflow);

    return () => observer.disconnect();
  }, [items]); // Rerun effect if `items` array itself changes, as this is a fundamental content change.

  const maxHeight = rowMaxHeight + padding * 2;

  return (
    <div
      className={`flex flex-col items-center justify-center w-full gap-2 ${className}`}
    >
      <div
        ref={containerRef}
        data-expanded={isExpanded}
        className={`p-2 w-full flex flex-wrap max-h-${maxHeight} gap-5 overflow-hidden transition-[max-height] duration-300 ease-in-out data-[expanded=true]:max-h-[var(--full-height)]`}
      >
        {items.map(renderItem)}
      </div>

      {/* Show the button only when overflow is detected */}
      {isOverflowing && (
        <Button
          size="sm"
          variant="light"
          color="primary"
          className="text-tiny font-semibold text-blue-600 hover:text-blue-800"
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Ver Menos" : "Ver Mais"} Detalhes
        </Button>
      )}
    </div>
  );
}
