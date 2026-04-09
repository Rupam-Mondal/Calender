import { useState } from "react";
import { addMonths, subMonths } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const [range, setRange] = useState({
    start: null,
    end: null,
  });

  return (
    <div className="w-full flex justify-center items-center px-4">
      <div className="w-full relative max-w-[720px] rounded-2xl  shadow-xl bg-white">
        <div className="absolute -top-10 md:-top-12 z-50 w-full h-20">
          <img
            src="/images/spiral_transparent.png"
            className="w-full h-full object-cover"
            alt="spiral"
          />
        </div>
        <CalendarHeader
          currentDate={currentDate}
          nextMonth={nextMonth}
          prevMonth={prevMonth}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentDate.getMonth()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CalendarGrid currentDate={currentDate} range={range} setRange={setRange} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
