import { Ticket, TicketPriority, TicketStatus, TicketUser } from "@/app/models";
import { LabelContext } from "@/app/providers";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { User } from "@heroui/user";
import dayjs from "dayjs";
import { useContext } from "react";
import {
  Calendar,
  CircleAlert,
  CircleCheckBig,
  CircleDot,
  CircleEllipsis,
  Flag,
  Leaf,
  Link2,
  MessageSquareText,
} from "lucide-react";
import { Avatar } from "@heroui/avatar";

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
  const statusIcon = [
    <CircleDot size={16} />,
    <CircleEllipsis size={16} />,
    <CircleCheckBig size={16} />,
    <></>,
  ];
  const statusColor = ["success", "primary", "secondary", "default"] as const;
  return (
    <Chip color={statusColor[status]} startContent={statusIcon[status]}>
      {L.ticket.status[status]}
    </Chip>
  );
};

export const PriorityChip = ({ priority }: { priority: TicketPriority }) => {
  const L = useContext(LabelContext);
  const priorityColor = ["default", "warning", "danger", "default"] as const;
  const priorityIcon = [
    <Leaf size={16} />,
    <CircleAlert size={16} />,
    <Flag size={16} />,
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
  return (
    <Card className="w-5/6" isPressable onPress={onClick}>
      <CardHeader>
        <div className="flex w-full gap-5 justify-between items-center">
          <Avatar isBordered />
          <div className="flex flex-col gap-1 item-start justify-center">
            <h4 className="text-small font-semibold text-default-600">
              {ticket.createdBy.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {ticket.createdBy.branch} - {ticket.createdBy.sector}
            </h5>
          </div>
          <div className="w-full flex justify-center">
            <h3 className="font-semibold text-default-600">
              {ticket ? ticket.title : ""}
            </h3>
          </div>
          <div className="flex gap-5 items-center">
            <StatusChip status={ticket ? ticket.status : TicketStatus.OPEN} />
            <PriorityChip
              priority={ticket ? ticket.priority : TicketPriority.HIGH}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="flex w-2/3 self-center">
        <p className="text-small text-default-600">
          {ticket ? ticket.description : ""}
        </p>
      </CardBody>
      <CardFooter className="flex w-full justify-end gap-5">
        {ticket ? (
          <>
            <div className="flex gap-1 text-default-400 items-center">
              <MessageSquareText size={14} />
              <p className="text-xs">{ticket.comments.length}</p>
            </div>
            <div className="flex gap-1 text-default-400 items-center">
              <Link2 size={14} />
              <p className="text-tiny text-default-400">{`${ticket.files.length} anexo${ticket.files.length == 1 ? "" : "s"}`}</p>
            </div>
            <div className="flex gap-1 text-default-400 items-center">
              <Calendar size={14} />
              <p className="text-tiny text-default-400">
                {dayjs(ticket.createdAt).format("YYYY-MM-DD HH:mm")}
              </p>
            </div>
          </>
        ) : (
          <></>
        )}
      </CardFooter>
    </Card>
  );
};
