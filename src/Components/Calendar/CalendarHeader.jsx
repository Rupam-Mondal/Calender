import { format } from "date-fns";
import { motion } from "framer-motion";

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
    <div className="relative w-full h-[280px] md:h-[320px] overflow-hidden rounded-2xl shadow-lg">

      <motion.img
        key={currentDate.getMonth()}
        src={images[currentDate.getMonth()]}
        alt="calendar"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full object-cover"
      />

      
      <div className="absolute inset-0 bg-black/30" /> 

      
      <div className="absolute bottom-0 left-0 w-full h-36 md:h-48">


        <div className="absolute bottom-0 left-0 w-full h-full bg-white
          [clip-path:polygon(0_100%,100%_100%,100%_40%,65%_60%,35%_60%,0_40%)]" />

        <div className="absolute bottom-0 right-0 w-[65%] h-full bg-gradient-to-r text-black 
           flex items-end justify-end p-4">

          <div className="text-black text-right">
            <p className="text-sm opacity-80">
              {format(currentDate, "yyyy")}
            </p>
            <h1 className="text-2xl font-bold tracking-wide">
              {format(currentDate, "MMMM").toUpperCase()}
            </h1>
          </div>
        </div>
      </div>

      
      <button
        onClick={prevMonth}
        className="absolute left-4 top-1/2 -translate-y-1/2 
        backdrop-blur-md bg-white/20 hover:bg-white/40 
        border border-white/30 text-white 
        w-10 h-10 rounded-full flex items-center justify-center 
        transition-all duration-300 shadow-md"
      >
        <span className="text-lg">‹</span>
      </button>

      
      <button
        onClick={nextMonth}
        className="absolute right-4 top-1/2 -translate-y-1/2 
        backdrop-blur-md bg-white/20 hover:bg-white/40 
        border border-white/30 text-white 
        w-10 h-10 rounded-full flex items-center justify-center 
        transition-all duration-300 shadow-md"
      >
        <span className="text-lg">›</span>
      </button>

    </div>
  );
}