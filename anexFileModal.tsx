import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { BigDocumentIcon, XLBigDocumentIcon } from "./icons";

export interface AnexModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  onCancel: () => void;
  filesAnnexed: File[];
  onFilesAnexedChange: (newFilesAnexed: File[]) => void;
}

export const AnexFileModal = ({
  isOpen,
  onConfirm,
  onClose,
  onCancel,
  filesAnnexed: filesAnexed,
  onFilesAnexedChange,
}: AnexModalProps) => {
  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent
        onDrop={(e) => {
          e.preventDefault();
          let files = [];
          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            files.push(e.dataTransfer.files[i]);
          }
          onFilesAnexedChange([...filesAnexed, ...files]);
        }}
        onDragOver={(e: { preventDefault: () => void }) => {
          e.preventDefault();
        }}
      >
        <ModalHeader>
          <p>Anexar Arquivos</p>
        </ModalHeader>
        <ModalBody className="flex flex-row">
          <ScrollShadow
            hideScrollBar
            className="overflow-scroll w-full justify-center items-center max-w-md max-h-[400px]"
          >
            <div className="flex flex-wrap items-center justify-center max-w-md max-h-sm border-default-300 border-2 rounded-xl p-6 gap-3">
              {filesAnexed.length != 0 ? (
                filesAnexed.map((file, idx) => (
                  <Card key={idx.toString()} className="w-fit">
                    <CardBody className="flex items-center justify-center">
                      <BigDocumentIcon />
                    </CardBody>
                    <CardFooter className="flex flex-col items-center justify-center w-max-xs">
                      <p className="text-tiny text-default-400 uppercase">
                        {file.size}
                      </p>
                      <h4 className="overflow-hidden text-ellipsis w-max-1/4">
                        {file.name}
                      </h4>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col w-fit h-fit justify-center items-center text-default-300">
                  <XLBigDocumentIcon />
                  <p>Arraste arquivos aqui para anexar.</p>
                </div>
              )}
            </div>
          </ScrollShadow>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onCancel}>
            Cancelar
          </Button>
          <Button color="primary" onPress={onConfirm}>
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
