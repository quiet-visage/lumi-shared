import { LabelContext } from "@/app/providers";
import { Card, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { User } from "@heroui/user";
import dayjs from "dayjs";
import { useContext } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckCircle2Icon,
  CircleAlert,
  CircleCheckBig,
  CircleDot,
  CircleEllipsis,
  CircleSmall,
  ClockIcon,
  CogIcon,
  Flag,
  Leaf,
  MessageSquareIcon,
  MessageSquareText,
  MinusIcon,
  PaperclipIcon,
  type LucideProps,
} from "lucide-react";
import {
  Ticket,
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from "@/components/admin/ticket/ticketModels";
import { Account } from "@/components/admin/account/accountModels";

export interface TicketCardProps {
  ticket: Ticket;
  onClick: () => void;
  truncate?: boolean;
}

export const CommentsBubble = ({ commentCount }: { commentCount: number }) => (
  <div className="flex space-x-2 text-default-400">
    <MessageSquareText size={16} />
    <p className="text-xs">{commentCount}</p>
  </div>
);

export const StatusChip = ({ status }: { status: TicketStatus }) => {
  const L = useContext(LabelContext);
  const statusIcon = [
    <CircleDot size={14} />,
    <CircleEllipsis size={14} />,
    <CircleCheckBig size={14} />,
    <></>,
  ];
  const statusColor = ["success", "primary", "secondary", "default"] as const;
  return (
    <Chip
      variant="shadow"
      color={statusColor[status]}
      startContent={statusIcon[status]}
      size="sm"
      className="p-3"
    >
      {L.ticket.status[status]}
    </Chip>
  );
};

export const PriorityChip = ({ priority }: { priority: TicketPriority }) => {
  const L = useContext(LabelContext);
  const priorityColor = ["default", "default", "danger", "default"] as const;
  const priorityIcon = [
    <Leaf size={14} />,
    <CircleAlert size={14} />,
    <Flag size={14} />,
    <></>,
  ] as const;

  return (
    <Chip
      size="sm"
      variant="shadow"
      className="px-3"
      color={priorityColor[priority]}
      startContent={priorityIcon[priority]}
    >
      {L.ticket.priority[priority]}
    </Chip>
  );
};

export const TicketCardUser = ({
  user,
  createdAt,
  fileCount,
}: {
  user: Account;
  createdAt: Date;
  fileCount: number;
}) => (
  <div className="flex flex-col items-center justify-center w-1/4">
    <User name={user.name} description={`${user.branch} - ${user.sector}`} />
    <p className="text-tiny text-default-400">
      {dayjs(createdAt).format("DD-MM-YY HH:mm")}
    </p>
    <p className="text-tiny text-default-400">{`${fileCount} anexo${fileCount == 1 ? "" : "s"}`}</p>
  </div>
);

export const CategoryChip = ({ category }: { category: TicketCategory }) => {
  if (category == null || category.name.length < 1) return <></>;
  return (
    <Chip
      size="sm"
      variant="flat"
      startContent={<CircleSmall color={category.color} />}
      className="px-3"
    >
      {category.name}
    </Chip>
  );
};

export const TICKET_PRIORITY_MAP: {
  [key in TicketPriority]: {
    label: string;
    icon: React.ComponentType<LucideProps>;
    className: string;
  };
} = {
  [TicketPriority.LOW]: {
    label: "Low",
    icon: ArrowDownIcon,
    className: "text-gray-500",
  },
  [TicketPriority.MED]: {
    label: "Medium",
    icon: MinusIcon,
    className: "text-yellow-500",
  },
  [TicketPriority.HIGH]: {
    label: "High",
    icon: ArrowUpIcon,
    className: "text-red-500",
  },
  [TicketPriority.COUNT]: { label: "", icon: MinusIcon, className: "" },
};

// --- STATUS MAPPING ---
export const TICKET_STATUS_MAP: {
  [key in TicketStatus]: {
    label: string;
    icon: React.ComponentType<LucideProps>;
    className: string;
  };
} = {
  [TicketStatus.OPEN]: {
    label: "Open",
    icon: ClockIcon,
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  [TicketStatus.DEVELOPING]: {
    label: "Developing",
    icon: CogIcon,
    className:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  },
  [TicketStatus.CLOSED]: {
    label: "Closed",
    icon: CheckCircle2Icon,
    className:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  // Add COUNT case to satisfy TypeScript
  [TicketStatus.COUNT]: { label: "", icon: ClockIcon, className: "" },
};

export const TicketCard = ({ ticket, onClick }: TicketCardProps) => {
  const priorityInfo = TICKET_PRIORITY_MAP[ticket.priority];
  const statusInfo = TICKET_STATUS_MAP[ticket.status];

  // Helper to get initials from a name for the avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("");
  };

  return (
    <Card
      isPressable
      onPress={onClick}
      className="group flex flex-col justify-between p-4 shadow-sm transition-all hover:shadow-lg"
    >
      {/* Card Header */}
      <CardHeader className="p-0 mb-3 flex items-start justify-between">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 transition-colors transition-500 group-hover:text-[hsl(var(--heroui-primary))] dark:group-hover:text-blue-400">
            {ticket.title}
          </h3>
        </div>
        <span className="text-sm font-medium text-gray-400 dark:text-gray-500">
          #{ticket._id.substring(0, 6)}
        </span>
      </CardHeader>

      {/* Tags */}
      {ticket.tags && ticket.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {ticket.tags.map((tag) => (
            <span
              key={tag._id}
              className="rounded px-2 py-0.5 text-xs font-medium"
              style={{
                backgroundColor: `${tag.color}20`,
                color: tag.color,
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Card Footer */}
      <div className="mt-auto flex items-center justify-between pt-2">
        {/* Left Side: Priority & Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1" title={priorityInfo.label}>
            <priorityInfo.icon className={`size-5 ${priorityInfo.className}`} />
          </div>
          <StatusChip status={ticket.status} />
          {ticket.category && <CategoryChip category={ticket.category} />}
        </div>

        {/* Right Side: Meta & Assignee */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-1.5 text-gray-500 dark:text-gray-400 sm:flex">
            <MessageSquareIcon className="size-4" />
            <span className="text-xs font-medium">
              {ticket.comments.length}
            </span>
          </div>
          <div className="hidden items-center gap-1.5 text-gray-500 dark:text-gray-400 sm:flex">
            <PaperclipIcon className="size-4" />
            <span className="text-xs font-medium">{ticket.files.length}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {dayjs(ticket.createdAt).fromNow()}
            </span>
            {ticket.assignee && (
              <div
                className="relative size-8"
                title={`Assigned to ${ticket.assignee.name}`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600 dark:bg-gray-600 dark:text-gray-300">
                  {getInitials(ticket.assignee.name)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
