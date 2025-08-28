import { useState } from "react";
import { AnexFileModal } from "./anexFileModal";
import { FileUploadProgressPopUp } from "./fileUploadProgress";
import { FileTag } from "./fileTag";
import { Button } from "@heroui/button";
import { api } from "@/config/api";
import { addToast } from "@heroui/toast";
import { PaperclipIcon } from "lucide-react";
import { Account } from "../admin/account/accountModels";

interface AnnexProps {
  token: string;
  user: Account;
  annexes: File[];
  setAnnexes: (v: File[]) => void;
  isUploading: boolean;
  setIsUploading: (v: boolean) => void;
  compact?: boolean;
  showAnnexed?: boolean;
}

const AnnexButtonCompact = ({ onPress }: { onPress: () => void }) => (
  <Button size="sm" variant="flat" isIconOnly onPress={onPress}>
    <PaperclipIcon size={14} />
  </Button>
);

export const AnnexedFileList = ({
  annexes,
  setAnnexes,
}: {
  annexes: File[];
  setAnnexes: (v: File[]) => void;
}) => (
  <>
    {annexes.map((v, i) => (
      <FileTag
        name={v.name}
        key={i.toString()}
        onPress={() => setAnnexes(annexes.filter((vv) => vv.name != v.name))}
      />
    ))}
  </>
);

export const Annex = ({
  token,
  user,
  annexes,
  setAnnexes,
  isUploading,
  setIsUploading,
  compact = false,
  showAnnexed = true,
}: AnnexProps) => {
  const [isAnexMenuOpen, setIsAnexMenuOpen] = useState(false);
  const [filesToBeUploaded, setFilesToBeUploaded] = useState<File[]>([]);
  const [filesUploaded, setFilesUploaded] = useState<File[]>([]);
  const [failures, setFailures] = useState<string[]>([]);
  const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);
  const closeAnexMenu = () => setIsAnexMenuOpen(false);

  const uploadFiles = async () => {
    if (annexes.length == 0) return;

    setFilesToBeUploaded(annexes);

    setIsUploading(true);
    await annexes.forEach(async (file) => {
      let formData = new FormData();
      formData.append("file", file);

      let jsonData = {
        fileName: file.name,
        uploadedBy: user,
        createdAt: new Date(),
      };

      formData.append("body", JSON.stringify(jsonData));

      await api
        .post("/upload_file", formData, { headers: { Authorization: token } })
        .then((response) => {
          if (response.status == 200 || response.status == 201) {
            let newFilesToBeUploaded = [...filesToBeUploaded];
            newFilesToBeUploaded.pop();
            setFilesToBeUploaded(newFilesToBeUploaded);

            setFilesUploaded([...filesUploaded, file]);
          } else {
            let newFilesToBeUploaded = [...filesToBeUploaded];
            newFilesToBeUploaded.pop();
            setFilesToBeUploaded(newFilesToBeUploaded);

            addToast({
              title: `Falha ao enviar arquivo ${file.name}`,
              description: response.statusText,
              color: "danger",
            });
            setFailures([
              ...failures,
              `Failed to upload ${file.name}. ${response.statusText}`,
            ]);
          }
        })
        .catch((err) => {
          let newFilesToBeUploaded = [...filesToBeUploaded];
          newFilesToBeUploaded.pop();
          setFilesToBeUploaded(newFilesToBeUploaded);
          setFailures([...failures, `Failed to upload ${file.name}. ${err}`]);
          console.log(err);
        });
    });
    setIsUploading(false);
    setIsUploadPopupOpen(false);
  };

  return (
    <>
      <div className={(compact ? "" : "w-full") + " items-center"}>
        {compact ? <></> : <p className="pb-3">Anexos</p>}
        {showAnnexed ? (
          <div className="pb-3 flex flex-wrap gap-2">
            <AnnexedFileList annexes={annexes} setAnnexes={setAnnexes} />
          </div>
        ) : (
          <></>
        )}
        {compact ? (
          <AnnexButtonCompact onPress={() => setIsAnexMenuOpen(true)} />
        ) : (
          <Button
            className=""
            variant={"bordered"}
            endContent={<PaperclipIcon size={14} />}
            onPress={() => setIsAnexMenuOpen(true)}
          >
            Anexar arquivo
          </Button>
        )}
      </div>
      <AnexFileModal
        isOpen={isAnexMenuOpen}
        onConfirm={async () => {
          await uploadFiles();
          closeAnexMenu();
        }}
        onClose={closeAnexMenu}
        onCancel={() => {
          closeAnexMenu();
          setAnnexes([]);
        }}
        filesAnnexed={annexes}
        onFilesAnexedChange={(newFilesAnnexed: File[]) => {
          setAnnexes(newFilesAnnexed);
        }}
      />
      <FileUploadProgressPopUp
        filesBeingUploaded={filesToBeUploaded}
        filesUploaded={filesUploaded}
        failures={failures}
        isOpen={isUploadPopupOpen}
        onCloseRequest={() => {
          if (isUploading) return;
          setIsUploadPopupOpen(false);
        }}
      />
    </>
  );
};
