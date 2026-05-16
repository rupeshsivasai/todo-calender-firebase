import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function CalendarView({ todos, onDateSelect, selectedDate }) {
  const [view, setView] = useState("month");

  const events = todos
    .filter((t) => t.date)
    .map((t) => ({
      title: t.text,
      start: new Date(t.date),
      end: new Date(t.date),
      allDay: true,
      completed: t.completed,
    }));

  function eventStyle(event) {
    return {
      style: {
        backgroundColor: event.completed ? "#c7d2fe" : "#6366f1",
        borderRadius: "6px",
        border: "none",
        color: event.completed ? "#4338ca" : "white",
        fontSize: "11px",
        padding: "2px 7px",
        fontWeight: 500,
        textDecoration: event.completed ? "line-through" : "none",
        opacity: event.completed ? 0.8 : 1,
        boxShadow: event.completed ? "none" : "0 1px 3px rgba(99,102,241,0.3)",
      },
    };
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full animate-fade-in-up" style={{ animationDelay: "80ms" }}>
      <div className="p-5 border-b border-gray-50 flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">Calendar</h2>
        <div className="flex items-center gap-3">
          {selectedDate && (
            <span className="text-xs bg-indigo-100 text-indigo-600 px-2.5 py-1 rounded-full font-medium">
              {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} selected
            </span>
          )}
          <span className="text-xs text-gray-400 bg-indigo-50 text-indigo-500 px-2.5 py-1 rounded-full font-medium">
            {events.length} scheduled
          </span>
        </div>
      </div>

      <div className="p-5 flex-1">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyle}
          views={["month", "week", "day"]}
          view={view}
          onView={setView}
          selectable
          onSelectSlot={(slot) => onDateSelect(slot.start)}
          onSelectEvent={(event) => onDateSelect(event.start)}
          style={{ height: 480 }}
        />
      </div>
    </div>
  );
}
