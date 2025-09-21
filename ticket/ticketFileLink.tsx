import { FileLink } from "../fileLink";

export const TicketFileLink = ({ filename }: { filename: string }) => {
  return (
    <FileLink url={`${process.env.BASE_URL}file/${filename}`} />
  );
};
