import { useState, useEffect } from "react";
import { addMonths, subMonths } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import NotePopup from "./NotePopup";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const [range, setRange] = useState({
    start: null,
    end: null,
  });

  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || {};
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const getKey = () => {
    if (range.start && range.end) {
      return `${range.start.toDateString()}_${range.end.toDateString()}`;
    }
    if (selectedDate) {
      return selectedDate.toDateString();
    }
    return "";
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="w-full flex justify-center items-center px-4">
      <div className="w-full relative max-w-[900px] rounded-2xl shadow-xl bg-white">

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

        <div className="flex w-full">
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDate.getMonth()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CalendarGrid
                  currentDate={currentDate}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  range={range}
                  setRange={setRange}
                  notes={notes}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <NotePopup
            selectedDate={selectedDate}
            range={range}
            notes={notes}
            setNotes={setNotes}
            getKey={getKey}
          />
        </div>
      </div>
    </div>
  );
}