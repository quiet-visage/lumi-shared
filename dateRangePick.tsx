import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { CalendarRange } from "lucide-react";
import { PopoverSelectTrigger } from "./popOverSelectTrigger";
import { Calendar } from "@heroui/calendar";
import { today, getLocalTimeZone } from "@internationalized/date";

export const DateRangePick = ({
  minDate,
  maxDate,
  setMinDate,
  setMaxDate,
}: {
  minDate: any;
  maxDate: any;
  setMinDate: (v: any) => void;
  setMaxDate: (v: any) => void;
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
        <div className="flex flex-col w-fit items-center p-2 gap-2">
          <p>
            De {minDate?.year}-{minDate?.month}-{minDate?.day}
          </p>
          <Calendar
            showMonthAndYearPickers
            value={minDate}
            onFocusChange={(v) => setMinDate(v)}
            maxValue={maxDate}
          />
        </div>
        <div className="flex flex-col w-fit items-center p-2 gap-2">
          <p>
            Até {maxDate.year}-{maxDate.month}-{maxDate.day}
          </p>
          <Calendar
            showMonthAndYearPickers
            value={maxDate}
            onFocusChange={(v) => setMaxDate(v)}
            minValue={minDate}
            maxValue={today(getLocalTimeZone())}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
