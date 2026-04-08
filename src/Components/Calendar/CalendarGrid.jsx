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
    <div className="w-full bg-white px-4 py-4">

      <div className="grid grid-cols-7 mb-2 text-center text-gray-400 text-xs font-semibold">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((dayItem, i) => (
          <div
            key={i}
            className={`h-8 flex items-center justify-center text-sm transition-all
            ${
              !isSameMonth(dayItem, monthStart)
                ? "text-gray-300"
                : "text-gray-800"
            }
            `}
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full
              ${
                isToday(dayItem)
                  ? "bg-blue-500 text-white text-sm font-semibold shadow-sm"
                  : "hover:bg-gray-100"
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