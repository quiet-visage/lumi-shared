import { TicketTag } from "@/components/admin/ticket/ticketModels";
import { Chip } from "@heroui/chip";
import { Tag } from "lucide-react";

export const TagChip = ({ tag }: { tag: TicketTag }) => (
  <Chip
    size="sm"
    variant="bordered"
    startContent={<Tag size={14} color={tag.color} />}
  >
    {tag.name}
  </Chip>
);
