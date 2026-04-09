import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isToday,
} from "date-fns";

export default function CalendarGrid({ currentDate }) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);

  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <div className="w-full bg-white px-3 py-5 box-border">
      <div className="grid grid-cols-7 mb-3 text-center text-gray-400 text-xs font-semibold">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map((dayItem, i) => (
          <div
            key={i}
            className={`h-12 flex items-center justify-center text-sm ${
              !isSameMonth(dayItem, monthStart)
                ? "text-gray-300"
                : "text-gray-800"
            }`}
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200
              ${
                isToday(dayItem)
                  ? "bg-blue-500 text-white font-semibold shadow-md scale-105"
                  : "hover:bg-gray-100 hover:scale-105"
              }`}
            >
              {format(dayItem, "d")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}