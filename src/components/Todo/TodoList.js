import React, { useEffect, useState } from "react";

export default function TodoList({ todos, selectedDate, onClearDate, onAdd, onToggle, onDelete }) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate.toISOString().split("T")[0]);
    }
  }, [selectedDate]);

  function handleAdd(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim(), date);
    setText("");
    setDate("");
  }

  const completed = todos.filter((t) => t.completed).length;

  const dateFiltered = selectedDate
    ? todos.filter((t) => t.date === selectedDate.toISOString().split("T")[0])
    : todos;

  const filtered =
    filter === "active"
      ? dateFiltered.filter((t) => !t.completed)
      : filter === "done"
      ? dateFiltered.filter((t) => t.completed)
      : dateFiltered;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full animate-fade-in-up">
      {/* Header */}
      <div className="p-5 border-b border-gray-50">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-base font-bold text-gray-900">My Tasks</h2>
          <span className="text-xs text-gray-400">{completed}/{todos.length} done</span>
        </div>
        {selectedDate && (
          <div className="flex items-center justify-between mt-2 bg-indigo-50 rounded-xl px-3 py-2">
            <span className="text-xs text-indigo-600 font-medium">
              📅 {selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </span>
            <button
              onClick={onClearDate}
              className="text-xs text-indigo-400 hover:text-indigo-600 font-medium transition-colors"
            >
              Show all
            </button>
          </div>
        )}

        {/* Progress bar */}
        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
          <div
            className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: todos.length ? `${(completed / todos.length) * 100}%` : "0%" }}
          />
        </div>
      </div>

      {/* Add task form */}
      <form onSubmit={handleAdd} className="p-5 border-b border-gray-50">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-md active:scale-95"
          >
            + Add
          </button>
        </div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all"
        />
      </form>

      {/* Filter tabs */}
      <div className="flex gap-1 px-5 pt-4">
        {["all", "active", "done"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`capitalize text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${
              filter === f
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task list */}
      <ul className="flex-1 overflow-y-auto p-5 space-y-2 max-h-[380px]">
        {filtered.length === 0 && (
          <li className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
            <div className="text-4xl mb-2">
              {filter === "done" ? "🎉" : "📝"}
            </div>
            <p className="text-sm text-gray-400">
              {filter === "done" ? "No completed tasks yet" : "No tasks here. Add one above!"}
            </p>
          </li>
        )}
        {filtered.map((todo, i) => (
          <li
            key={todo.id}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 group transition-all duration-150 animate-slide-in"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <button
              onClick={() => onToggle(todo.id)}
              className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                todo.completed
                  ? "bg-indigo-500 border-indigo-500"
                  : "border-gray-300 hover:border-indigo-400"
              }`}
            >
              {todo.completed && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>

            <div className="flex-1 min-w-0">
              <p className={`text-sm leading-snug transition-all duration-200 ${
                todo.completed ? "line-through text-gray-400" : "text-gray-700"
              }`}>
                {todo.text}
              </p>
              {todo.date && (
                <p className="text-xs text-indigo-400 mt-0.5 flex items-center gap-1">
                  <span>📅</span> {todo.date}
                </p>
              )}
            </div>

            <button
              onClick={() => onDelete(todo.id)}
              className="opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-all duration-150"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      {/* Footer stats */}
      {todos.length > 0 && (
        <div className="px-5 py-3 border-t border-gray-50 flex items-center justify-between">
          <span className="text-xs text-gray-400">{todos.filter((t) => !t.completed).length} remaining</span>
          {todos.some((t) => t.completed) && (
            <button
              onClick={() => todos.filter((t) => t.completed).forEach((t) => onDelete(t.id))}
              className="text-xs text-gray-400 hover:text-red-400 transition-colors"
            >
              Clear completed
            </button>
          )}
        </div>
      )}
    </div>
  );
}
