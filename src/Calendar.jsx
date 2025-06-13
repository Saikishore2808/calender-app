import React, { useState } from "react";
import dayjs from "dayjs";
import eventsJSON from "./events.json";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [eventList, setEventList] = useState(eventsJSON);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [form, setForm] = useState({ title: "", time: "", duration: "" });

  const today = dayjs();
  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  const openModal = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const addEvent = () => {
    if (form.title && form.time && form.duration) {
      const newEvent = {
        ...form,
        date: selectedDate.format("YYYY-MM-DD"),
      };
      setEventList([...eventList, newEvent]);
      setShowModal(false);
      setForm({ title: "", time: "", duration: "" });
    }
  };

  const generateCalendar = () => {
    const calendar = [];
    const totalCells = startDay + daysInMonth;
    const rows = Math.ceil(totalCells / 7);
    let dayCounter = 1 - startDay;

    for (let i = 0; i < rows; i++) {
      const row = [];

      for (let j = 0; j < 7; j++) {
        const thisDate = currentDate.date(dayCounter);
        const dateStr = thisDate.format("YYYY-MM-DD");
        const dayEvents = eventList.filter((e) => e.date === dateStr);

        row.push(
          <div
            key={j}
            onClick={() => openModal(thisDate)}
            className={`border p-2 min-h-[70px] cursor-pointer
              ${thisDate.isSame(today, "day") ? "bg-blue-100 dark:bg-blue-900 font-bold" : ""}
              ${dayEvents.length > 0 ? "bg-green-100 dark:bg-green-800" : ""}
              hover:bg-blue-50 dark:hover:bg-gray-700`}
          >
            <div className="text-sm">{thisDate.date()}</div>
            {dayEvents.map((event, index) => (
              <div
                key={index}
                className="bg-green-300 dark:bg-green-600 text-xs mt-1 p-1 rounded"
              >
                {event.title}
              </div>
            ))}
          </div>
        );

        dayCounter++;
      }

      calendar.push(
        <div key={i} className="grid grid-cols-7 gap-1">
          {row}
        </div>
      );
    }

    return calendar;
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-gray-300 dark:bg-gray-700 px-2 py-1 rounded"
          onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
        >
          Prev
        </button>
        <h2 className="text-xl font-semibold">{currentDate.format("MMMM YYYY")}</h2>
        <button
          className="bg-gray-300 dark:bg-gray-700 px-2 py-1 rounded"
          onClick={() => setCurrentDate(currentDate.add(1, "month"))}
        >
          Next
        </button>
      </div>

      <div className="grid grid-cols-7 font-semibold text-center mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid gap-1">{generateCalendar()}</div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded w-80 space-y-3">
            <h2 className="text-lg font-bold text-center">Add Event</h2>
            <p className="text-sm text-center">
              {selectedDate && selectedDate.format("MMMM D, YYYY")}
            </p>
            <input
              type="text"
              placeholder="Event Title"
              className="w-full px-2 py-1 border rounded dark:bg-gray-700"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              type="time"
              className="w-full px-2 py-1 border rounded dark:bg-gray-700"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
            />
            <input
              type="text"
              placeholder="Duration (e.g. 1h)"
              className="w-full px-2 py-1 border rounded dark:bg-gray-700"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded"
                onClick={addEvent}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Calendar;
