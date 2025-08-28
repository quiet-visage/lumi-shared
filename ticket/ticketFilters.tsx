import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import { DateRangePick } from "../dateRangePick";
import { PriorityFilter } from "./priorityFilter";
import { StatusFilter } from "./statusFilter";
import { DateValue } from "@heroui/calendar";

interface TicketFiltersSelectProps {
  minDate: DateValue;
  maxDate: DateValue;
  priority: Set<string>;
  status: Set<string>;
  setMinDate: (v: DateValue) => void;
  setMaxDate: (v: DateValue) => void;
  setPriority: (v: Set<string>) => void;
  setStatus: (v: Set<string>) => void;
  className?: string;
}

export const TicketFiltersSelect = ({
  minDate,
  maxDate,
  priority,
  status,
  setMinDate,
  setMaxDate,
  setPriority,
  setStatus,
  className = "",
}: TicketFiltersSelectProps) => {
  return (
    <div className="flex flex-col gap-2 items-center w-full">
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
