import { useState } from "react";
import { addMonths, subMonths } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
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

        <AnimatePresence mode="wait">
          <motion.div
            key={currentDate.getMonth()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CalendarGrid currentDate={currentDate} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}