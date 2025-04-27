import { Input } from "@heroui/input";
import { UserRound } from "lucide-react";

export const UserFormInput = () => (
  <Input
    isRequired
    startContent={<UserRound size={16} />}
    name="username"
    label="Usuário"
    variant="bordered"
  />
);
