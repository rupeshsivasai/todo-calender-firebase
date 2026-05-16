import React, { useState, useEffect } from "react";
import TodoList from "../components/Todo/TodoList";
import CalendarView from "../components/Calendar/CalendarView";
import Navbar from "../components/Layout/Navbar";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("todos");
  const [selectedDate, setSelectedDate] = useState(null);
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem(`todos_${currentUser.uid}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(`todos_${currentUser.uid}`, JSON.stringify(todos));
  }, [todos, currentUser.uid]);

  function addTodo(text, date) {
    const newTodo = {
      id: Date.now().toString(),
      text,
      date: date || null,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function handleDateSelect(date) {
    setSelectedDate(date);
    setActiveTab("todos");
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
          <TodoList
            todos={todos}
            selectedDate={selectedDate}
            onClearDate={() => setSelectedDate(null)}
            onAdd={addTodo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
          <CalendarView
            todos={todos}
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
          />
        </div>

        {/* Mobile views */}
        <div className="lg:hidden mt-4">
          {activeTab === "todos" ? (
            <TodoList
              todos={todos}
              selectedDate={selectedDate}
              onClearDate={() => setSelectedDate(null)}
              onAdd={addTodo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ) : (
            <CalendarView
              todos={todos}
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
            />
          )}
        </div>
      </div>
    </div>
  );
}
