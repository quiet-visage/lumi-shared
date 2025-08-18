import { Button } from "@heroui/react";
import { RefreshCwIcon } from "lucide-react";

export const RefreshButton = ({ isLoading, onPress }: RefreshButtonProps) => {
  return (
    <Button
      size="sm"
      variant="light"
      color="primary"
      isLoading={isLoading}
      onPress={onPress}
      isIconOnly
    >
      <RefreshCwIcon size={16} />
    </Button>
  );
};

interface RefreshButtonProps {
  isLoading: boolean;
  onPress: () => void;
}
