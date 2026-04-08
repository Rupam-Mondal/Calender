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
    <div className="w-full max-w-[900px] bg-white rounded-2xl px-4 py-4">

      <div className="grid grid-cols-7 mb-2 text-center text-gray-400 text-sm font-medium">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map((dayItem, i) => (
          <div
            key={i}
            className={`h-9 flex items-center justify-center rounded-lg text-sm transition-all duration-200
            ${
              !isSameMonth(dayItem, monthStart)
                ? "text-gray-300"
                : "text-gray-800"
            }
            ${
              isToday(dayItem)
                ? "bg-blue-500 text-white font-semibold shadow-sm"
                : "hover:bg-gray-100"
            }
            `}
          >
            {format(dayItem, "d")}
          </div>
        ))}
      </div>
    </div>
  );
}