import { ChevronDown, ChevronRight } from "lucide-react";
import { useRef } from "react";

export const AnimatedChevron = ({
  open,
  flip = false,
  direction = "horizontal",
  size = 16,
  className = "",
  transitionColor = false,
}: {
  open: boolean;
  flip?: boolean;
  direction?: ChevronDirection;
  size?: number;
  className?: string;
  transitionColor?: boolean;
}) => {
  const svRef = useRef<SVGSVGElement>(null);
  svRef.current?.setAttribute("data-open", open.toString());

  const normalRotation = "data-[open=true]:rotate-180 ";
  const flippedRotation = "data-[open=true]:rotate-0 rotate-180";
  const rotation = flip ? flippedRotation : normalRotation;
  const chevronClass = `transition-colors transition-transform duration-150 ease motion-reduce:transition-none ${rotation} ${className} stroke-[hsl(var(--heroui-${open ? "danger" : "default"}))]`;

  if (direction == "horizontal") {
    return <ChevronRight ref={svRef} size={size} className={chevronClass} />;
  }

  return <ChevronDown ref={svRef} size={size} className={chevronClass} />;
};

export type ChevronDirection = "horizontal" | "vertical";
