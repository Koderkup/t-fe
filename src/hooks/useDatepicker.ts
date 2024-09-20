import {
  addYears,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  getYear,
  set,
  setMonth,
  setYear,
} from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DatepickerType, WheelType } from "@/components/ui/datepicker/types.ts";

export const useDatepicker = (type: DatepickerType) => {
  const now = useMemo(() => new Date(), []);
  const [currentDate, setCurrentDate] = useState(now);

  useEffect(() => {
    setCurrentDate(now);
  }, [now, type]);

  const months = useMemo(
    () =>
      eachMonthOfInterval({
        start: new Date(2024, 0, 1),
        end: new Date(2024, 11, 1),
      }),
    []
  );

  const years = useMemo(
    () =>
      eachYearOfInterval({
        start: new Date(getYear(now), 0, 1),
        end: new Date(addYears(now, 10)),
      }),
    [now]
  );

  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 31),
      }),
    []
  );

  const getInitIdx = useCallback(
    (wheelType: WheelType) => {
      switch (wheelType) {
        case "day":
          return days.findIndex(day => day.getDate() === now.getDate());
        case "month":
          return months.findIndex(day => day.getMonth() === now.getMonth());
        case "year":
          return years.findIndex(
            day => day.getFullYear() === now.getFullYear()
          );

        default:
          return 0;
      }
    },
    [years, days, months, now]
  );

  const handleDateChange = useCallback(
    (wheelType: WheelType, value: Date) => {
      switch (wheelType) {
        case "day":
          setCurrentDate(prev => set(prev, { date: value.getDate() }));
          break;
        case "month":
          setCurrentDate(prev => setMonth(prev, value.getMonth()));
          break;
        case "year":
          setCurrentDate(prev => setYear(prev, value.getFullYear()));
          break;

        default:
          break;
      }
    },
    [setCurrentDate]
  );

  return {
    months,
    years,
    currentDate,
    setCurrentDate,
    days,
    handleDateChange,
    getInitIdx,
  };
};
