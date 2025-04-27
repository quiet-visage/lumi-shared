import { Button } from "@heroui/button";
import {
  File,
  FileArchive,
  FileCode,
  FileCog,
  FileImage,
  FileJson,
  FileMusic,
  FileTerminal,
  FileText,
  FileVideo,
} from "lucide-react";
import { ReactNode } from "react";

export interface FileTagProps {
  name: string;
  onPress?: () => void;
}

const extFileIcon = (ext: string) => {
  const table: Record<string, ReactNode> = {
    ".jpg": <FileImage />,
    ".jpeg": <FileImage />,
    ".png": <FileImage />,
    ".gif": <FileImage />,
    ".bmp": <FileImage />,
    ".svg": <FileImage />,

    ".mp3": <FileMusic />,
    ".wav": <FileMusic />,
    ".ogg": <FileMusic />,

    ".mp4": <FileVideo />,
    ".avi": <FileVideo />,
    ".mkv": <FileVideo />,

    ".pdf": <FileText />,
    ".docx": <FileText />,
    ".doc": <FileText />,
    ".xlsx": <FileText />,
    ".xls": <FileText />,
    ".pptx": <FileText />,
    ".ppt": <FileText />,
    ".txt": <FileText />,

    ".gz": <FileArchive />,
    ".z": <FileArchive />,
    ".tar": <FileArchive />,
    ".7z": <FileArchive />,
    ".xz": <FileArchive />,

    ".json": <FileJson />,
    ".c": <FileCode />,
    ".cc": <FileCode />,
    ".cs": <FileCode />,
    ".kt": <FileCode />,
    ".cpp": <FileCode />,
    ".js": <FileCode />,
    ".py": <FileCode />,
    ".html": <FileCode />,
    ".css": <FileCode />,

    ".conf": <FileCog />,
    ".toml": <FileCog />,
    ".env": <FileCog />,
    ".ini": <FileCog />,

    ".ps1": <FileTerminal />,
    ".bash": <FileTerminal />,
    ".sh": <FileTerminal />,
    ".fish": <FileTerminal />,
  };
  if (ext in table) return table[ext.toLowerCase()];
  else return <File />;
};

export const FileTag = ({ name, onPress }: FileTagProps) => {
  let pressFn = onPress;
  let fileExt = name.substring(name.lastIndexOf("."));
  pressFn ??= () => {};
  return (
    <Button
      variant="ghost"
      color="secondary"
      endContent={extFileIcon(fileExt)}
      onPress={onPress}
    >
      {name}
    </Button>
  );
};
