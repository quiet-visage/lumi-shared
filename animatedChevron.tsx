import { ChevronDown } from "lucide-react";
import { useRef } from "react";

export const AnimatedChevron = ({
  open,
  size = 16,
  className = "",
}: {
  open: boolean;
  size?: number;
  className?: string;
}) => {
  const svRef = useRef<SVGSVGElement>(null);
  svRef.current?.setAttribute("data-open", open.toString());

  return (
    <ChevronDown
      ref={svRef}
      size={size}
      className={
        "transition-transform duration-150 ease motion-reduce:transition-none data-[open=true]:rotate-180 " +
        className
      }
    />
  );
};
