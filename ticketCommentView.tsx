import { TicketComment } from "@/app/models";
import { apiFileUrl } from "@/config/api";
import { Card, CardBody } from "@heroui/card";
import { User } from "@heroui/user";
import dayjs from "dayjs";
import { FileLink } from "./fileLink";

export interface TicketCommentProps {
  comment: TicketComment;
}

export const TicketCommentView = ({ comment }: TicketCommentProps) => {
  return (
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
};
