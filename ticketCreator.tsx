import { Ticket, TicketPriority, TicketStatus, TicketUser } from "@/app/models";
import { Input, Textarea } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";
import { useContext, useState } from "react";
import { Button } from "@heroui/button";
import { api } from "@/config/api";
import { LabelContext } from "@/app/providers";
import { Annex } from "./annex";
import { headers } from "next/headers";

export interface TicketCreationProps {
  isOpen: boolean;
  user: TicketUser;
  token: string;
  onUpload: () => void;
  onCancel: () => void;
}

export const TicketCreation = ({
  isOpen,
  user,
  token,
  onCancel,
  onUpload,
}: TicketCreationProps) => {
  const L = useContext(LabelContext);
  const [subject, onSubjectChange] = useState<string>("");
  const [comment, onCommentChange] = useState<string>("");
  const [annexes, setAnnexes] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [priority, setPriority] = useState<TicketPriority>(TicketPriority.MED);

  const uploadTicket = async () => {
    let ticket: Ticket = {
      _id: "",
      title: subject,
      description: comment,
      status: TicketStatus.OPEN,
      priority: priority,
      createdBy: user,
      createdAt: new Date(),
      comments: [],
      files: annexes.map((v) => v.name),
      assignee: {
        _id: "0".repeat(24),
        name: "",
        sector: "",
        branch: "",
      },
    };

    api
      .post("/add_ticket", JSON.stringify(ticket), {
        headers: { Authorization: token },
      })
      .then((response) => {
        addToast({ title: "chamado criado", color: "success" });
      })
      .catch((err) => {
        console.log(err);
        addToast({
          title: "Falha ao criar chamado",
          color: "danger",
        });
      });

    onUpload();
  };

  return (
    <>
      <Modal size="lg" isOpen={isOpen} onClose={onCancel} backdrop="blur">
        <ModalContent>
          <ModalHeader>Criar Chamado</ModalHeader>
          <ModalBody>
            <div className="flex gap-3">
              <Input
                className="w-2/3"
                value={subject}
                onValueChange={onSubjectChange}
                isRequired
                label="Assunto"
                minLength={3}
              ></Input>
              <Select
                disallowEmptySelection
                className="w-1/3"
                label="prioridade"
                defaultSelectedKeys={[TicketPriority.MED]}
                //@ts-ignore
                onChange={(e) => setPriority(e.target.key)}
              >
                {L.ticket.priority.map((value, i) => (
                  <SelectItem key={i}>{value}</SelectItem>
                ))}
              </Select>
            </div>
            <Textarea
              value={comment}
              onValueChange={onCommentChange}
              label="Comentário"
            />
            <Annex
              token={token}
              user={user}
              annexes={annexes}
              setAnnexes={setAnnexes}
              isUploading={isUploading}
              setIsUploading={setIsUploading}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onCancel}>
              Cancelar
            </Button>
            <Button color="primary" onPress={uploadTicket}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
