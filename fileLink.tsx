import { FileTag } from "./fileTag";

interface FileLinkProps {
  url: string;
}

export const FileLink = ({ url }: FileLinkProps) => {
  return (
    <FileTag
      name={url.substring(url.lastIndexOf("/"))}
      onPress={
        //@ts-ignore
        () => window.electron.openExternal(url)
      }
    />
  );
};
