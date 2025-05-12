import { Ticket, TicketPriority, TicketStatus, TicketUser } from "@/app/models";
import { LabelContext } from "@/app/providers";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { User } from "@heroui/user";
import dayjs from "dayjs";
import { useContext } from "react";
import {
  CircleAlert,
  CircleCheck,
  Flag,
  Info,
  Lock,
  MessageSquareText,
} from "lucide-react";

export interface TicketCardProps {
  ticket: Ticket;
  onClick: () => void;
  truncate?: boolean;
}

export const CommentsBubble = ({ commentCount }: { commentCount: number }) => (
  <div className="flex text-default-400">
    <MessageSquareText />
    <p className="text-xs">{commentCount}</p>
  </div>
);

export const StatusChip = ({ status }: { status: TicketStatus }) => {
  const L = useContext(LabelContext);
  const statusIcon = [<Info />, <Lock />, <></>];
  const statusColor = ["primary", "secondary", "default"] as const;
  return (
    <Chip color={statusColor[status]} startContent={statusIcon[status]}>
      {L.ticket.status[status]}
    </Chip>
  );
};

export const PriorityChip = ({ priority }: { priority: TicketPriority }) => {
  const L = useContext(LabelContext);
  const priorityColor = ["success", "warning", "danger", "default"] as const;
  const priorityIcon = [
    <CircleCheck />,
    <CircleAlert />,
    <Flag />,
    <></>,
  ] as const;

  return (
    <Chip color={priorityColor[priority]} startContent={priorityIcon[priority]}>
      {L.ticket.priority[priority]}
    </Chip>
  );
};

export const TicketCardUser = ({
  user,
  createdAt,
  fileCount,
}: {
  user: TicketUser;
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

export const TicketCard = ({
  ticket,
  onClick,
  truncate = false,
}: TicketCardProps) => {
  const L = useContext(LabelContext);

  return (
    <div className="inline-block max-w-5xl text-center justify-around">
      <Card className="flex max-w-5xl" isPressable onPress={onClick}>
        <CardBody className="flex flex-row gap-6 items-center">
          <TicketCardUser
            user={ticket.createdBy}
            createdAt={ticket.createdAt}
            fileCount={ticket.files.length}
          />
          <div
            className={
              "flex flex-col justify-center min-w-0 w-full max-w-xs w-max-md" +
              (truncate ? " truncate" : "")
            }
          >
            <p className={"text-md" + (truncate ? " truncate" : "")}>
              {ticket.title}
            </p>
            <p
              className={
                "text-default-500 min-w-0" + (truncate ? " truncate" : "")
              }
            >
              {ticket.description}
            </p>
          </div>
          <CommentsBubble commentCount={ticket.comments.length} />
          <PriorityChip priority={ticket.priority} />
          <StatusChip status={ticket.status} />
        </CardBody>
      </Card>
    </div>
  );
};
