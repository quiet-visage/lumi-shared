import { Button } from "@heroui/button";
import { ReactNode, useState } from "react";
import { AnimatedChevron, ChevronDirection } from "./animatedChevron";

export const PopoverSelectTrigger = ({
  open = false,
  className = "",
  hideChevron = false,
  loading = false,
  children,
  flipChevron = false,
  chevronDirection = "horizontal",
  ...props
}: {
  open: boolean;
  className?: string;
  hideChevron?: boolean;
  loading?: boolean;
  children: ReactNode;
  flipChevron?: boolean;
  chevronDirection?: ChevronDirection;
}) => {
  const endContent = hideChevron ? (
    <></>
  ) : (
    <AnimatedChevron
      flip={flipChevron}
      direction={chevronDirection}
      open={open}
      className="absolute end-2"
    />
  );
  return (
    <Button
      {...props}
      isLoading={loading}
      endContent={endContent}
      size="sm"
      variant="bordered"
      className={
        "inline-flex flex-row items-center w-full justify-start " + className
      }
    >
      {children}
    </Button>
  );
};
