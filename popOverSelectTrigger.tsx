import { Button } from "@heroui/button";
import { ReactNode, useState } from "react";
import { AnimatedChevron } from "./animatedChevron";

export const PopoverSelectTrigger = ({
  className = "",
  children,
  ...props
}: {
  className?: string;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Button
      {...props}
      onPress={() => setOpen(!open)}
      endContent={<AnimatedChevron open={open} className="absolute end-3" />}
      variant="flat"
      className={
        className +
        " inline-flex flex-row items-center w-full bg-default-100 justify-start"
      }
    >
      {children}
    </Button>
  );
};
