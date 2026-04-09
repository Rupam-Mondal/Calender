import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function NotePopup({
  selectedDate,
  range,
  notes,
  setNotes,
  getKey,
}) {
  const [value, setValue] = useState("");
  const [editing, setEditing] = useState(false);

  const key = getKey();

  useEffect(() => {
    if (key) {
      setValue(notes[key] || "");
      setEditing(false);
    }
  }, [key, notes]);

  return (
    <div className="w-[280px] min-h-full border-l border-gray-200 bg-white p-4 flex flex-col">
      {!selectedDate && !range.start ? (
        <div className="text-gray-400 text-sm">
          Select a date or range to add notes
        </div>
      ) : (
        <>
          <div className="mb-4">
            {range.start && range.end ? (
              <h2 className="text-lg font-semibold">
                {format(range.start, "dd MMM")} -{" "}
                {format(range.end, "dd MMM")}
              </h2>
            ) : (
              <>
                <p className="text-xs text-gray-400">
                  {format(selectedDate, "EEEE")}
                </p>
                <h2 className="text-lg font-semibold">
                  {format(selectedDate, "dd MMM yyyy")}
                </h2>
              </>
            )}
          </div>

          {!editing ? (
            <>
              <div className="flex-1 text-sm text-gray-700 bg-gray-50 p-3 rounded-md border">
                {notes[key] ? notes[key] : "No notes yet"}
              </div>

              <button
                onClick={() => setEditing(true)}
                className="mt-4 w-full py-2 text-sm bg-black text-white rounded-md"
              >
                {notes[key] ? "Edit Note" : "+ Add Note"}
              </button>
            </>
          ) : (
            <>
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Write your note..."
                className="flex-1 border p-2 rounded-md text-sm outline-none resize-none"
              />

              <button
                onClick={() => {
                  setNotes((prev) => ({
                    ...prev,
                    [key]: value,
                  }));
                  setEditing(false);
                }}
                className="mt-3 w-full py-2 text-sm bg-black text-white rounded-md"
              >
                Save Note
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}