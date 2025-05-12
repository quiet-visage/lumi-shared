import { Button } from "@heroui/button";
import { ReactNode, useState } from "react";
import { AnimatedChevron } from "./animatedChevron";

export const PopoverSelectTrigger = ({
  children,
  ...props
}: {
  children: ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Button
      {...props}
      onPress={() => setOpen(!open)}
      endContent={<AnimatedChevron open={open} />}
      variant="flat"
    >
      {children}
    </Button>
  );
};
