import { Button } from "@heroui/button";
import { ReactNode, useState } from "react";
import { AnimatedChevron } from "./animatedChevron";

export const PopoverSelectTrigger = ({
  className = "",
  hideChevron = false,
  children,
  ...props
}: {
  className?: string;
  hideChevron?: boolean;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const endContent = hideChevron ? (
    <></>
  ) : (
    <AnimatedChevron open={open} className="absolute end-3" />
  );
  return (
    <Button
      {...props}
      onPress={() => setOpen(!open)}
      endContent={endContent}
      variant="flat"
      className={
        "inline-flex flex-row items-center w-full bg-default-100 justify-start " +
        className
      }
    >
      {children}
    </Button>
  );
};
