import { Listbox, ListboxSection, ListboxItem } from "@heroui/listbox";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import {
  CircleHelp,
  CircleDot,
  CircleEllipsis,
  CircleCheckBig,
} from "lucide-react";
import { PopoverSelectTrigger } from "../popOverSelectTrigger";

export const StatusFilter = ({
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
          startContent={<CircleHelp size={16} />}
        >
          Status
        </PopoverSelectTrigger>
      </PopoverTrigger>
      <PopoverContent>
        <Listbox
          selectionMode="multiple"
          selectedKeys={filters}
          onSelectionChange={(v: any) => setFilters(v)}
        >
          <ListboxSection title="Filtrar">
            <ListboxItem
              startContent={
                <CircleDot
                  size={16}
                  className="stroke-[hsl(var(--heroui-success))]"
                />
              }
              key={"0"}
            >
              Aberto
            </ListboxItem>
            <ListboxItem
              startContent={
                <CircleEllipsis
                  size={16}
                  className="stroke-[hsl(var(--heroui-primary))]"
                />
              }
              key={"1"}
            >
              Desenvolvendo
            </ListboxItem>
            <ListboxItem
              startContent={
                <CircleCheckBig
                  size={16}
                  className="stroke-[hsl(var(--heroui-secondary))]"
                />
              }
              key={"2"}
            >
              Encerrado
            </ListboxItem>
          </ListboxSection>
        </Listbox>{" "}
      </PopoverContent>{" "}
    </Popover>
  );
};
