import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

const images = {
  0: "/images/jan.jpg",
  1: "/images/feb.jpg",
  2: "/images/mar.jpg",
  3: "/images/apr.jpg",
  4: "/images/may.jpg",
  5: "/images/jun.jpg",
  6: "/images/jul.jpg",
  7: "/images/aug.jpg",
  8: "/images/sep.jpg",
  9: "/images/oct.jpg",
  10: "/images/nov.jpg",
  11: "/images/dec.jpg",
};

export default function CalendarHeader({
  currentDate,
  nextMonth,
  prevMonth,
}) {
  return (
    <div className="relative w-full h-[220px] md:h-[260px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentDate.getMonth()}
          src={images[currentDate.getMonth()]}
          alt="calendar"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="absolute bottom-3 w-full px-4 py-3 flex justify-end">
        <div className="text-right">
          <p className="text-xl text-white">
            {format(currentDate, "yyyy")}
          </p>
          <h1 className="text-2xl font-bold text-white">
            {format(currentDate, "MMMM")}
          </h1>
        </div>
      </div>

      <button
        onClick={prevMonth}
        className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 
        bg-white/20 hover:bg-white/40 border border-white/30 text-white 
        w-9 h-9 rounded-full flex items-center justify-center 
        transition-all shadow-md"
      >
        ‹
      </button>

      <button
        onClick={nextMonth}
        className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 
        bg-white/20 hover:bg-white/40 border border-white/30 text-white 
        w-9 h-9 rounded-full flex items-center justify-center 
        transition-all shadow-md"
      >
        ›
      </button>
    </div>
  );
}