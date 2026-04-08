import { useState } from "react";
import { addMonths, subMonths } from "date-fns";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-[720px] rounded-2xl overflow-hidden shadow-xl bg-white">
        <CalendarHeader
          currentDate={currentDate}
          nextMonth={nextMonth}
          prevMonth={prevMonth}
        />
        <CalendarGrid currentDate={currentDate} />
      </div>
    </div>
  );
}