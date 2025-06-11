import { CommentType, Ticket, TicketComment, TicketUser } from "@/app/models";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@heroui/drawer";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { addToast } from "@heroui/toast";
import { useEffect, useRef, useState } from "react";
import { TicketCommentView } from "./ticketCommentView";
import { TicketFileLink } from "./ticketFileLink";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { PaperClipIcon, PaperPlaneIcon } from "./icons";
import { AnexFileModal } from "./anexFileModal";
import { api } from "@/config/api";
import {
  CommentsBubble,
  PriorityChip,
  StatusChip,
  TicketCard,
} from "./ticketCard";
import { Annex, AnnexedFileList } from "./annex";

interface TicketDiscussionProps {
  ticket: Ticket;
  isOpen: boolean;
  user: TicketUser;
  token: string;
  onOpenChange: (open: boolean) => void;
}

export const TicketDiscussion = ({
  ticket,
  isOpen,
  user,
  token,
  onOpenChange,
}: TicketDiscussionProps) => {
  const [commentText, setCommentText] = useState<string>("");
  const [annexes, setAnnexes] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sendBtnRef = useRef<HTMLButtonElement>(null);

  const clearInputs = () => {
    setCommentText("");
    setAnnexes([]);
  };

  const onSendComment = async () => {
    if (!commentText.length && !annexes.length) return;
    let comment: TicketComment = {
      _id: "",
      content: commentText,
      createdBy: user,
      createdAt: new Date(),
      files: annexes.map((f) => f.name),
      type: CommentType.Standard,
    };

    await api
      .post(
        "/add_comment",
        {
          comment: comment,
          ticketID: ticket._id,
        },
        { headers: { Authorization: token } }
      )
      .then((r) => {
        addToast({ title: "Comentário enviado", color: "success" });
      })
      .catch((e) => {
        addToast({ title: "Falha ao enviar comentário", color: "danger" });
      });
    clearInputs();
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [ticket]);

  return (
    <>
      <Drawer
        placement={"left"}
        size={"2xl"}
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          <DrawerHeader className="flex-col mx-8 gap-4 max-h-1/2">
            <p className="text-md max-h-sm">{ticket.title}</p>
            <div className="flex justify-between items-center">
              <StatusChip status={ticket.status} />
              <div className="flex gap-4 items-center">
                <CommentsBubble commentCount={ticket.comments.length} />
                <PriorityChip priority={ticket.priority} />
              </div>
            </div>
          </DrawerHeader>
          <DrawerBody>
            <ScrollShadow className="flex flex-col gap-5">
              <TicketCommentView
                comment={{
                  _id: "",
                  content: ticket.description,
                  createdAt: ticket.createdAt,
                  createdBy: ticket.createdBy,
                  type: CommentType.Standard,
                  files: ticket.files,
                }}
              />
              {ticket.comments.map((comment, idx) => (
                <TicketCommentView comment={comment} key={idx.toString()} />
              ))}
              <div ref={scrollRef} />
            </ScrollShadow>
          </DrawerBody>
          <DrawerFooter className="flex flex-col w-full">
            <div className="flex items-center gap-2">
              <Textarea
                isClearable
                className="w-full"
                label="Comentar"
                minRows={1}
                maxRows={3}
                value={commentText}
                onValueChange={(t) => setCommentText(t)}
              ></Textarea>
              <Annex
                token={token}
                user={user}
                annexes={annexes}
                setAnnexes={setAnnexes}
                isUploading={isUploading}
                setIsUploading={setIsUploading}
                compact
                showAnnexed={false}
              />
              <Button
                ref={sendBtnRef}
                variant="flat"
                isIconOnly
                onPress={onSendComment}
              >
                <PaperPlaneIcon />
              </Button>
            </div>
            <div className="flex gap-2">
              <AnnexedFileList annexes={annexes} setAnnexes={setAnnexes} />
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
