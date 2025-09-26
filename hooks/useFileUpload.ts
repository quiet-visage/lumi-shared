import { useAdminToken } from "@/app/adminTokenProvider";
import { Account } from "@/components/admin/account/accountModels";
import { FileUploadStatus } from "@/components/admin/fileUploadView";
import { api } from "@/config/api";
import { addToast } from "@heroui/react";
import { useContext, useState } from "react";
import { decodeToken } from "react-jwt";

export const useFileUpload = () => {
  const token = useAdminToken();
  const decodedToken: { [key: string]: string } | null = decodeToken(token);
  if (decodedToken === null) throw "invalid token";
  const user: Account = {
    _id: decodedToken._id,
    name: decodedToken.name,
    sector: decodedToken.sector,
    branch: decodedToken.branch,
    viewScope: Number(decodedToken.viewScope),
    disabled: decodedToken.disabled === "true" ? true : false,
    username: "",
    email: "",
    createdAt: new Date(), // TODO
    updatedAt: new Date(),
    role: "",
  };

  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [fileUploadStatuses, setFileUploadStatuses] = useState<
    FileUploadStatus[]
  >([]);
  const [isUploading, setIsUploading] = useState(false);

  const beginUpload = async () => {
    setIsUploading(true);
    const uploadPromises = filesToUpload.map(async (file, index) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "body",
        JSON.stringify({
          fileName: file.name,
          uploadedBy: user,
          createdAt: new Date(),
        })
      );

      setFileUploadStatuses(
        filesToUpload.map((v) => ({ fileName: v.name, progress: 0 }))
      );
      try {
        await api.post("/upload_file", formData, {
          headers: { Authorization: token },
          onUploadProgress: (progress) => {
            if (progress.progress === undefined) return;
            setFileUploadStatuses((currentStatuses) =>
              currentStatuses.map((status, i) =>
                i === index
                  ? { ...status, progress: progress.progress! }
                  : status
              )
            );
          },
        });
        return { file: file.name, uploaded: true };
      } catch (e) {
        console.error(`Failed to upload ${file.name}`, e);
        setFileUploadStatuses((currentStatuses) =>
          currentStatuses.map((status, i) =>
            i === index ? { ...status, progress: -1 } : status
          )
        );
        addToast({ title: "Upload failed  " + file.name });
        return { file: file.name, uploaded: false };
      }
    });
    const results = await Promise.allSettled(uploadPromises);
    setIsUploading(false);
    return results;
  };

  return {
    filesToUpload,
    setFilesToUpload,
    fileUploadStatuses,
    setFileUploadStatuses,
    beginUpload,
    isUploading,
  };
};
