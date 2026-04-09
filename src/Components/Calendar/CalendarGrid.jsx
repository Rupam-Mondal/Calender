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

export default function CalendarGrid({ currentDate, range, setRange }) {
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

  const handleDateClick = (day) => {
    if (!range.start || (range.start && range.end)) {
      setRange({ start: day, end: null });
    } else if (day < range.start) {
      setRange({ start: day, end: range.start });
    } else {
      setRange({ ...range, end: day });
    }
  };

  const isSameDay = (d1, d2) =>
    d1 && d2 && d1.toDateString() === d2.toDateString();

  return (
    <div className="w-full bg-white px-3 box-border py-4">
      <div className="grid grid-cols-7 mb-2 text-center text-gray-400 text-xs font-semibold">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((dayItem, i) => {
          const isStart = isSameDay(dayItem, range.start);
          const isEnd = isSameDay(dayItem, range.end);

          const isInRange =
            range.start &&
            range.end &&
            dayItem >= range.start &&
            dayItem <= range.end;

          return (
            <div
              key={i}
              className={`h-10 flex cursor-pointer items-center justify-center text-sm ${
                !isSameMonth(dayItem, monthStart)
                  ? "text-gray-300"
                  : "text-gray-800"
              }`}
            >
              <div
                onClick={() => handleDateClick(dayItem)}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200
                  ${
                    isStart || isEnd
                      ? "bg-blue-600 text-white font-bold scale-105"
                      : isInRange
                      ? "bg-blue-100 text-blue-700"
                      : isToday(dayItem)
                      ? "bg-blue-500 text-white font-semibold"
                      : "hover:bg-gray-100 hover:scale-105"
                  }
                `}
              >
                {format(dayItem, "d")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}