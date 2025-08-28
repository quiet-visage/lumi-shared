import { FileLink } from "../fileLink";

export const TicketFileLink = ({ filename }: { filename: string }) => {
  return (
    <FileLink url={`http://${process.env.API_HOST}:8000/file/${filename}`} />
  );
};
