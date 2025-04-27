import { Listbox, ListboxItem, ListboxSection } from "@heroui/listbox";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Progress } from "@heroui/progress";

export interface FileUploadProgressPopUpProps {
  filesBeingUploaded: File[];
  filesUploaded: File[];
  failures: string[];
  isOpen: boolean;
  onCloseRequest: () => void;
}

export const FileUploadProgressPopUp = ({
  filesBeingUploaded,
  filesUploaded,
  failures,
  onCloseRequest,
  isOpen,
}: FileUploadProgressPopUpProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onCloseRequest}>
      <ModalContent>
        <ModalHeader>Upload de arquivos</ModalHeader>
        <ModalBody>
          <Progress isIndeterminate size="sm" />
          <Listbox shouldHighlightOnFocus={false} variant="bordered">
            <ListboxSection title="Uploading">
              {filesBeingUploaded.map((v, i) => (
                <ListboxItem isReadOnly key={i.toString()} title={v.name} />
              ))}
            </ListboxSection>
            {filesUploaded.length > 0 ? (
              <ListboxSection title="Uploaded">
                {filesUploaded.map((v, i) => (
                  <ListboxItem isReadOnly key={i.toString()} title={v.name} />
                ))}
              </ListboxSection>
            ) : (
              <></>
            )}
            {failures.length > 0 ? (
              <ListboxSection title="Falhas">
                {failures.map((v, i) => (
                  <ListboxItem isReadOnly key={i.toString()} title={v} />
                ))}
              </ListboxSection>
            ) : (
              <></>
            )}
          </Listbox>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
