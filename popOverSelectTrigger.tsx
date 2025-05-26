import { Button } from "@heroui/button";
import { ReactNode, useState } from "react";
import { AnimatedChevron } from "./animatedChevron";

export const PopoverSelectTrigger = ({
  className = "",
  hideChevron = false,
  loading = false,
  children,
  ...props
}: {
  className?: string;
  hideChevron?: boolean;
  loading?: boolean;
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
      isLoading={loading}
      onPress={() => setOpen(!open)}
      endContent={endContent}
      size="sm"
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
