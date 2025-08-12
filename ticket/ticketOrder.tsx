import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  Settings2Icon,
} from "lucide-react";
import { useContext } from "react";
import { LabelContext } from "@/app/providers";

export enum OrderBy {
  Date,
  Title,
  Status,
  Priority,
}

export enum Order {
  Ascending,
  Descending,
}

export const TicketOrder = ({}: { order: Order; orderBy: OrderBy }) => {
  const L = useContext(LabelContext);
  return (
    <Popover placement="bottom" backdrop="blur">
      <PopoverTrigger>
        <Button size="sm" color="secondary" endContent={<Settings2Icon />}>
          Ordenar
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px]">
        <div className="flex flex-col p-2 gap-2 w-full h-fit">
          <p className="text-default-400">ordenar por</p>
          <Listbox
            selectionMode="single"
            variant="flat"
            disallowEmptySelection
            defaultSelectedKeys={[OrderBy.Date]}
          >
            <ListboxItem key={OrderBy.Date}>
              {L.ticket.orderby[OrderBy.Date]}
            </ListboxItem>
            <ListboxItem key={OrderBy.Title}>
              {L.ticket.orderby[OrderBy.Title]}
            </ListboxItem>
            <ListboxItem key={OrderBy.Status}>
              {L.ticket.orderby[OrderBy.Status]}
            </ListboxItem>
            <ListboxItem key={OrderBy.Priority}>
              {L.ticket.orderby[OrderBy.Priority]}
            </ListboxItem>
          </Listbox>
          <Divider />
          <p className="text-default-400">ordem</p>
          <Listbox
            defaultSelectedKeys={[Order.Descending]}
            selectionMode="single"
            variant="flat"
            disallowEmptySelection
          >
            <ListboxItem
              key={Order.Ascending}
              startContent={<ArrowUpNarrowWide />}
            >
              {L.ticket.order[Order.Ascending]}
            </ListboxItem>
            <ListboxItem
              key={Order.Descending}
              startContent={<ArrowDownWideNarrow />}
            >
              {L.ticket.order[Order.Descending]}
            </ListboxItem>
          </Listbox>
          <div className="flex justify-end w-full pt-2">
            <Button variant="light" color="danger">
              Fechar
            </Button>
            <Button variant="light" color="primary">
              Ok
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
