import { format } from "date-fns";

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

export default function CalendarHeader({ currentDate }) {
  return (
    <div className="relative h-48">
      
      <img
        src={images[currentDate.getMonth()]}
        alt="calendar"
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-0 left-0 w-full bg-blue-500 text-white p-4">
        <h2 className="text-sm">{format(currentDate, "yyyy")}</h2>
        <h1 className="text-2xl font-bold">
          {format(currentDate, "MMMM")}
        </h1>
      </div>

    </div>
  );
}