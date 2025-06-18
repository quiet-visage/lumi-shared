import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";

export const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  message,
  confirmText,
  cancelText,
}: {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
  message: string;
  confirmText?: string;
  cancelText?: string;
}) => {
  confirmText ??= "confirmar";
  cancelText ??= "cancelar";
  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <div className="py-4 w-full flex justify-end items-center">
            <Button onPress={onClose} variant="light" color="danger">
              {cancelText}
            </Button>
            <Button
              onPress={() => {
                onConfirm();
                onClose();
              }}
              color="primary"
              variant="shadow"
            >
              {confirmText}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
