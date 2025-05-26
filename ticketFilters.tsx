import { Input } from "@heroui/input";
import { DateValue } from "@internationalized/date";
import { Search } from "lucide-react";
import { DateRangePick } from "./dateRangePick";
import { PriorityFilter } from "./priorityFilter";
import { StatusFilter } from "./statusFilter";

interface TicketFiltersSelectProps {
  minDate: DateValue;
  maxDate: DateValue;
  search: string;
  priority: Set<string>;
  status: Set<string>;
  setMinDate: (v: DateValue) => void;
  setMaxDate: (v: DateValue) => void;
  setSearch: (v: string) => void;
  setPriority: (v: Set<string>) => void;
  setStatus: (v: Set<string>) => void;
  className?: string;
}

export const TicketFiltersSelect = ({
  minDate,
  maxDate,
  search,
  priority,
  status,
  setMinDate,
  setMaxDate,
  setSearch,
  setPriority,
  setStatus,
  className = "",
}: TicketFiltersSelectProps) => {
  return (
    <div className="flex gap-2 items-center w-full">
      <Input
        value={search}
        onValueChange={setSearch}
        startContent={<Search size={16} />}
        placeholder="procurar"
        size="sm"
      />
      <DateRangePick
        minDate={minDate}
        maxDate={maxDate}
        setMinDate={setMinDate}
        setMaxDate={setMaxDate}
      />
      <PriorityFilter filters={priority} setFilters={setPriority} />
      <StatusFilter filters={status} setFilters={setStatus} />
    </div>
  );
};
