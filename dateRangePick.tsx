import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { CalendarRange } from "lucide-react";
import { PopoverSelectTrigger } from "./popOverSelectTrigger";
import { Calendar } from "@heroui/calendar";
import { today, getLocalTimeZone, DateValue } from "@internationalized/date";

export const DateRangePick = ({
  minDate,
  maxDate,
}: {
  minDate: DateValue;
  maxDate: DateValue;
}) => {
  return (
    <Popover placement="bottom" triggerType="listbox">
      <PopoverTrigger>
        <PopoverSelectTrigger
          //@ts-expect-error
          startContent={<CalendarRange size={16} />}
        >
          Data
        </PopoverSelectTrigger>
      </PopoverTrigger>
      <PopoverContent className="flex flex-row w-fit">
        <div className="flex flex-col w-fit items-center p-2">
          <p>
            De {minDate.year}-{minDate.month}-{minDate.day}
          </p>
          <Calendar
            showMonthAndYearPickers
            value={minDate}
            onFocusChange={(v) => console.log(v)}
            maxValue={maxDate}
          />
        </div>
        <div className="flex flex-col w-fit items-center p-2">
          <p>
            Até {maxDate.year}-{maxDate.month}-{maxDate.day}
          </p>
          <Calendar
            showMonthAndYearPickers
            value={maxDate}
            onFocusChange={(v) => console.log(v)}
            minValue={minDate}
            maxValue={maxDate}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
