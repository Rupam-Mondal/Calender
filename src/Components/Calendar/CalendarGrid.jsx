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

export default function CalendarGrid({
  currentDate,
  selectedDate,
  setSelectedDate,
  range,
  setRange,
  notes,
}) {
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

  const isSameDay = (d1, d2) =>
    d1 && d2 && d1.toDateString() === d2.toDateString();

  const handleClick = (dayItem) => {
    if (!range.start || (range.start && range.end)) {
      setRange({ start: dayItem, end: null });
    } else if (dayItem < range.start) {
      setRange({ start: dayItem, end: range.start });
    } else {
      setRange({ ...range, end: dayItem });
    }

    setSelectedDate(dayItem);
  };

  return (
    <div className="w-full bg-white px-3 box-border py-4">
      <div className="grid grid-cols-7 mb-2 text-center text-gray-400 text-xs font-semibold">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((dayItem, i) => {
          const isSelected = isSameDay(dayItem, selectedDate);

          const isStart =
            range.start && isSameDay(dayItem, range.start);

          const isEnd =
            range.end && isSameDay(dayItem, range.end);

          const isInRange =
            range.start &&
            range.end &&
            dayItem >= range.start &&
            dayItem <= range.end;

          const hasNote = notes[dayItem.toDateString()];

          return (
            <div
              key={i}
              className={`h-10 flex items-center justify-center text-sm ${
                !isSameMonth(dayItem, monthStart)
                  ? "text-gray-300"
                  : "text-gray-800"
              }`}
            >
              <div
                onClick={() => handleClick(dayItem)}
                className={`w-10 h-10 flex flex-col items-center justify-center rounded-full transition-all duration-200
                  ${
                    isStart || isEnd
                      ? "bg-black text-white"
                      : isInRange
                      ? "bg-gray-200 text-black"
                      : isSelected
                      ? "bg-blue-500 text-white"
                      : isToday(dayItem)
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }
                `}
              >
                {format(dayItem, "d")}

                {hasNote && (
                  <div className="w-1.5 h-1.5 bg-black rounded-full mt-1"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}