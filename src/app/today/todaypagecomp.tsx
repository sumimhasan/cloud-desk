"use client";

import { useState } from "react";

interface Task {
  id: number;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "done";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
}

interface DiaryEntry {
  id: number;
  time: string;
  date: string;
  note: string;
}

export default function TodayPageContent() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Design new component", status: "pending", priority: "High", dueDate: "2025-09-08" },
    { id: 2, title: "Team meeting", status: "in-progress", priority: "Medium", dueDate: "2025-09-09" },
    { id: 3, title: "Code review", status: "done", priority: "Low", dueDate: "2025-09-07" },
  ]);

  const [diary, setDiary] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState("");

  const addDiaryEntry = () => {
    if (!newEntry.trim()) return;
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const date = now.toLocaleDateString();
    setDiary([...diary, { id: diary.length + 1, time: timestamp, date, note: newEntry }]);
    setNewEntry("");
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: task.status === "done" ? "pending" : "done" } : task
    ));
  };

  const requestChange = (id: number) => {
    alert(`Change request created for Task #${id}`);
  };

  // Tailwind class variables
  const containerClass = "flex-1 flex p-4 space-x-4 overflow-y-auto";

  const leftColClass = "flex-1 bg-gray-600 p-4 rounded-lg space-y-4 overflow-y-auto";
  const leftTitleClass = "text-xl font-bold mb-6 text-white";
  const taskCardClass = "p-3 rounded-md flex flex-col bg-white shadow";
  const taskHeaderClass = "flex justify-between items-center";
  const taskTitleClass = "font-semibold";
  const taskPriorityClass = (priority: string) =>
    `text-xs px-2 py-1 rounded ${
      priority === "High"
        ? "bg-red-200 text-red-800"
        : priority === "Medium"
        ? "bg-yellow-200 text-yellow-800"
        : "bg-green-200 text-green-800"
    }`;
  const taskDescClass = "text-gray-700 text-sm mt-1 overflow-hidden overflow-ellipsis line-clamp-2";
  const taskFooterClass = "flex justify-between items-center mt-2 text-sm text-gray-600";
  const taskButtonClass = (color: string) => `px-3 py-1 bg-${color}-500 text-white rounded-md hover:bg-${color}-600 text-sm`;
  const taskButtonsContainerClass = "flex space-x-2 mt-3";

  const rightColClass = "w-80 bg-gray-600 p-4 rounded-lg flex flex-col space-y-4 overflow-y-auto";
  const rightTitleClass = "text-xl font-bold text-white mb-6";
  const diaryInputClass = "flex-1 p-2 rounded-md bg-white border border-gray-300";
  const diaryAddBtnClass = "px-3 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 cursor-pointer";
  const diaryEntryClass = "p-2 rounded-md bg-white border shadow";
  const diaryHeaderClass = "flex justify-between text-xs text-gray-500 mb-1";
  const diaryTextClass = "text-gray-800 text-sm";
  const diaryTagClass = "text-blue-600 font-semibold hover:underline cursor-pointer";

  return (
    <div className={containerClass}>
      {/* Left Column - Today's Tasks */}
      <div className={leftColClass}>
        <h2 className={leftTitleClass}>Today's Tasks</h2>
        {tasks.map((task) => (
          <div key={task.id} className={taskCardClass}>
            <div className={taskHeaderClass}>
              <span className={taskTitleClass}>{task.title}</span>
              <span className={taskPriorityClass(task.priority)}>{task.priority}</span>
            </div>

            <p className={taskDescClass}>{task.description || "No description provided."}</p>

            <div className={taskFooterClass}>
              <span>Due: {task.dueDate}</span>
              <span className="capitalize">Status: {task.status}</span>
            </div>

            <div className={taskButtonsContainerClass}>
              <button
                onClick={() => toggleTaskCompletion(task.id)}
                className={taskButtonClass("green")}
              >
                {task.status === "done" ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => requestChange(task.id)}
                className={taskButtonClass("blue")}
              >
                Request Change
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Right Column - Work Diary */}
      <div className={rightColClass}>
        <h2 className={rightTitleClass}>Work Diary</h2>

        {/* Add new diary entry */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Add work note... Use #task1, #task2 to tag tasks"
            className={diaryInputClass}
          />
          <button onClick={addDiaryEntry} className={diaryAddBtnClass}>
            Add
          </button>
        </div>

        {/* Diary Entries */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {diary.length === 0 && <p className="text-gray-400 text-sm">No diary entries yet.</p>}
          {diary.map((entry) => {
            const parts = entry.note.split(/(#task\d+)/g);

            return (
              <div key={entry.id} className={diaryEntryClass}>
                <div className={diaryHeaderClass}>
                  <span>{entry.date}</span>
                  <span>{entry.time}</span>
                </div>
                <p className={diaryTextClass}>
                  {parts.map((part, idx) =>
                    part.match(/^#task\d+$/i) ? (
                      <span
                        key={idx}
                        className={diaryTagClass}
                        onClick={() => alert(`Go to ${part}`)}
                      >
                        {part}
                      </span>
                    ) : (
                      part
                    )
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
