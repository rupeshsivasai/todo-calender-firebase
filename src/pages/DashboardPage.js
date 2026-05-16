import React, { useState } from "react";
import TodoList from "../components/Todo/TodoList";
import CalendarView from "../components/Calendar/CalendarView";
import Navbar from "../components/Layout/Navbar";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("todos");
  const [selectedDate, setSelectedDate] = useState(null);

  function handleDateSelect(date) {
    setSelectedDate(date);
    setActiveTab("todos"); // switch to tasks tab on mobile
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20">
      <Navbar />

      {/* Mobile tab switcher */}
      <div className="lg:hidden flex gap-2 px-4 pt-4">
        {[["todos", "📝 Tasks"], ["calendar", "📅 Calendar"]].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === key
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-gray-500 border border-gray-200 hover:border-indigo-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Desktop: side by side | Mobile: tabbed */}
      <div className="max-w-7xl mx-auto px-4 py-5 lg:py-8">
        <div className="hidden lg:grid lg:grid-cols-2 gap-6 items-start">
          <TodoList selectedDate={selectedDate} onClearDate={() => setSelectedDate(null)} />
          <CalendarView onDateSelect={handleDateSelect} selectedDate={selectedDate} />
        </div>

        {/* Mobile views */}
        <div className="lg:hidden mt-4">
          {activeTab === "todos"
            ? <TodoList selectedDate={selectedDate} onClearDate={() => setSelectedDate(null)} />
            : <CalendarView onDateSelect={handleDateSelect} selectedDate={selectedDate} />}
        </div>
      </div>
    </div>
  );
}
