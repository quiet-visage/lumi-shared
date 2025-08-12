import { PopoverContent } from "@heroui/popover";
import { Calendar } from "@heroui/calendar";
import { today, getLocalTimeZone } from "@internationalized/date";
import { PopoverSelect } from "../admin/popOverSelect";

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
    <PopoverSelect triggerContent="Data" placement="bottom">
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
    </PopoverSelect>
  );
};
