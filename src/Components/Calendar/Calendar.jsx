import { useState } from "react";
import { addMonths, subMonths } from "date-fns";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  return (
    <>
      <div className="w-[540px] mx-auto bg-white shadow-xl rounded-xl overflow-hidden flex flex-col">
        <CalendarHeader currentDate={currentDate}
        nextMonth={nextMonth}
        prevMonth={prevMonth} />

        <CalendarGrid currentDate={currentDate} />
      </div>
    </>
  );
}
