import { FileLink } from "./fileLink";

export const TicketFileLink = ({ filename }: { filename: string }) => {
  return <FileLink url={`http://192.168.0.207:8000/api/file/${filename}`} />;
};
