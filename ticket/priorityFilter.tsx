import { Listbox, ListboxSection, ListboxItem } from "@heroui/listbox";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { CircleAlert, Leaf, Flag } from "lucide-react";
import { PopoverSelectTrigger } from "../popOverSelectTrigger";

export const PriorityFilter = ({
  filters,
  setFilters,
}: {
  filters: Set<string>;
  setFilters: (v: Set<string>) => void;
}) => {
  return (
    <Popover placement="bottom" triggerType="listbox">
      <PopoverTrigger>
        <PopoverSelectTrigger
          //@ts-expect-error
          startContent={<CircleAlert size={16} />}
        >
          Prioridade
        </PopoverSelectTrigger>
      </PopoverTrigger>
      <PopoverContent>
        <Listbox
          selectedKeys={filters}
          selectionMode="multiple"
          onSelectionChange={(v: any) => setFilters(v)}
        >
          <ListboxSection title="Filtrar">
            <ListboxItem startContent={<Leaf size={16} />} key={"0"}>
              Baixa
            </ListboxItem>
            <ListboxItem startContent={<CircleAlert size={16} />} key={"1"}>
              Média
            </ListboxItem>
            <ListboxItem startContent={<Flag size={16} />} key={"2"}>
              Alta
            </ListboxItem>
          </ListboxSection>
        </Listbox>
      </PopoverContent>
    </Popover>
  );
};
