import {
  CommentType,
  TicketCategory,
  TicketComment,
  TicketTag,
  TicketUser,
} from "@/app/models";
import { apiFileUrl } from "@/config/api";
import { Card, CardBody } from "@heroui/card";
import { User } from "@heroui/user";
import dayjs from "dayjs";
import { FileLink } from "./fileLink";
import { CircleSmall, UserCog } from "lucide-react";
import { TagChip } from "./tagChip";
import { CategoryChip, PriorityChip, StatusChip } from "./ticketCard";

export const TicketCommentView = ({ comment }: { comment: TicketComment }) => {
  switch (comment.type) {
    case CommentType.Standard:
      return <StandardCommentView comment={comment} />;
    case CommentType.AssigneeChange:
      return <AssigneeChangeCommentView comment={comment} />;
    case CommentType.AssigneeRemove:
      return <AssigneeRemoveCommentView comment={comment} />;
    case CommentType.TagAdd:
      return <TagAddCommentView comment={comment} />;
    case CommentType.TagRemove:
      return <TagRemoveCommentView comment={comment} />;
    case CommentType.CategoryChange:
      return <CategoryChangeComment comment={comment} />;
    case CommentType.StatusChange:
      return <StatusChangeComment comment={comment} />;
    case CommentType.PriorityChange:
      return <PriorityChangeComment comment={comment} />;
    default:
      return <p>Comment type {comment.type} not implemented.</p>;
  }
};

const StatusChangeComment = ({ comment }: { comment: TicketComment }) => {
  const status: number = Number(JSON.parse(comment.content));
  return (
    <div className="flex gap-2 items-center">
      <CircleSmall />
      <span>{comment.createdBy.name} Mudou a priridade para: </span>
      <StatusChip status={status} />
    </div>
  );
};

const PriorityChangeComment = ({ comment }: { comment: TicketComment }) => {
  const priority: number = Number(JSON.parse(comment.content));
  return (
    <div className="flex gap-2 items-center">
      <CircleSmall />
      <span>{comment.createdBy.name} Mudou a priridade para: </span>
      <PriorityChip priority={priority} />
    </div>
  );
};

const CategoryChangeComment = ({ comment }: { comment: TicketComment }) => {
  const category: TicketCategory = JSON.parse(comment.content);
  return (
    <div className="flex gap-2 items-center">
      <CircleSmall />
      <span>{comment.createdBy.name} Definiu a categoria</span>
      <CategoryChip category={category} />
    </div>
  );
};

const TagRemoveCommentView = ({ comment }: { comment: TicketComment }) => {
  const tag: TicketTag = JSON.parse(comment.content);
  return (
    <div className="flex gap-2 items-center">
      <span>{comment.createdBy.name} removeu a tag</span>
      <TagChip tag={tag} />
    </div>
  );
};

const TagAddCommentView = ({ comment }: { comment: TicketComment }) => {
  const tag: TicketTag = JSON.parse(comment.content);
  return (
    <div className="flex gap-2 items-center">
      <span>{comment.createdBy.name} adicionou a tag</span>
      <TagChip tag={tag} />
    </div>
  );
};

const AssigneeChangeCommentView = ({ comment }: { comment: TicketComment }) => {
  const assignedUser: TicketUser = JSON.parse(comment.content);
  return (
    <div className="flex gap-2 items-center">
      <UserCog size={16} />
      <span>
        {comment.createdBy.name} designou {assignedUser.name} [
        {assignedUser.branch} - {assignedUser.sector}] como atendente
      </span>
    </div>
  );
};

const AssigneeRemoveCommentView = ({ comment }: { comment: TicketComment }) => {
  return (
    <div className="flex gap-2 items-center">
      <UserCog size={16} />
      <span>{comment.createdBy.name} removeu o atendente</span>
    </div>
  );
};

const StandardCommentView = ({ comment }: { comment: TicketComment }) => (
  <Card className="min-h-fit" shadow="sm">
    <CardBody className="flex flex-row gap-6 items-start">
      <div className="flex flex-col items-center gap-1 justify-center">
        <User name={comment.createdBy.name} />
        <p className="text-tiny text-center text-default-400">
          {dayjs(comment.createdAt).format("DD-MM-YYYY HH:mm")}
        </p>
        {comment.files.length ? (
          <p className="text-tiny text-default-400">{`${comment.files.length} anexo${comment.files.length == 1 ? "" : "s"}`}</p>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col justify-between gap-6">
        <div>
          <p className="text-small text-default-500 text-pretty">
            {comment.content}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {comment.files.map((v, i) => (
            <FileLink url={apiFileUrl(v)} key={i.toString()} />
          ))}
        </div>
      </div>
    </CardBody>
  </Card>
);
