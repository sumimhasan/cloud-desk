"use client";

import { useState } from "react";

interface Task {
  id: number;
  title: string;
  assignee: string;
  dueDate: string;
  status: "Todo" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
}

interface WorkTableProps {
  isAdmin?: boolean;
}

export default function WorkTable({ isAdmin = false }: WorkTableProps) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Fix bug", assignee: "Alice", dueDate: "2025-09-06", status: "In Progress", priority: "High" },
    { id: 2, title: "Design UI", assignee: "Bob", dueDate: "2025-09-07", status: "Todo", priority: "Medium" },
    { id: 3, title: "Testing", assignee: "Carol", dueDate: "2025-09-09", status: "Done", priority: "Low" },
    { id: 4, title: "Update Docs", assignee: "Alice", dueDate: "2025-09-10", status: "Todo", priority: "Low" },
    { id: 5, title: "Backend API", assignee: "Me", dueDate: "2025-09-12", status: "In Progress", priority: "High" },
  ]);

  const [viewMode, setViewMode] = useState<"all" | "user" | "my">("all");
  const [searchUser, setSearchUser] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Todo" | "In Progress" | "Done">("All");
  const [sortField, setSortField] = useState<"Due Date" | "Priority" | "Status">("Due Date");

  // Add Task Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    assignee: "",
    dueDate: "",
    status: "Todo" as Task["status"],
    priority: "Low" as Task["priority"],
  });

  // Add Task Handler
  const handleAddTask = () => {
    if (!newTask.title || !newTask.assignee || !newTask.dueDate) return;
    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        ...newTask,
      },
    ]);
    setIsModalOpen(false);
    setNewTask({ title: "", assignee: "", dueDate: "", status: "Todo", priority: "Low" });
  };

  // Filter & Sort
  const filteredTasks = tasks
    .filter((task) => {
      if (!isAdmin) return task.assignee === "Me";
      if (viewMode === "all") return true;
      if (viewMode === "user") return task.assignee.toLowerCase().includes(searchUser.toLowerCase());
      if (viewMode === "my") return task.assignee === "Me";
      return true;
    })
    .filter((task) => (filterStatus === "All" ? true : task.status === filterStatus))
    .sort((a, b) => {
      if (sortField === "Due Date") return a.dueDate.localeCompare(b.dueDate);
      if (sortField === "Priority") {
        const priorityMap = { High: 3, Medium: 2, Low: 1 };
        return priorityMap[b.priority] - priorityMap[a.priority];
      }
      if (sortField === "Status") {
        const statusMap = { "Done": 3, "In Progress": 2, "Todo": 1 };
        return statusMap[b.status] - statusMap[a.status];
      }
      return 0;
    });

  return (
    <div className="flex flex-col w-full bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-100 rounded-t-xl space-y-2 md:space-y-0">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-semibold text-gray-800">WorkTable</h2>
          {isAdmin && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("all")}
                className={`px-3 py-1 text-sm rounded-md ${
                  viewMode === "all" ? "bg-gray-300 text-gray-900" : "bg-gray-100 text-gray-600"
                }`}
              >
                All Tasks
              </button>
              <button
                onClick={() => setViewMode("user")}
                className={`px-3 py-1 text-sm rounded-md ${
                  viewMode === "user" ? "bg-gray-300 text-gray-900" : "bg-gray-100 text-gray-600"
                }`}
              >
                User Search
              </button>
              <button
                onClick={() => setViewMode("my")}
                className={`px-3 py-1 text-sm rounded-md ${
                  viewMode === "my" ? "bg-gray-300 text-gray-900" : "bg-gray-100 text-gray-600"
                }`}
              >
                My Tasks
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {isAdmin && viewMode !== "user" && (
            <button
              className="px-3 py-1 text-sm bg-gray-700 text-white rounded-md hover:bg-gray-800"
              onClick={() => setIsModalOpen(true)}
            >
              + Add Task
            </button>
          )}
          {viewMode === "user" && isAdmin && (
            <input
              type="text"
              placeholder="Search user..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded-md text-sm"
            />
          )}
          {/* Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-2 py-1 text-sm border border-gray-300 rounded-md bg-gray-100"
          >
            <option>All</option>
            <option>Todo</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
          {/* Sort */}
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as any)}
            className="px-2 py-1 text-sm border border-gray-300 rounded-md bg-gray-100"
          >
            <option>Due Date</option>
            <option>Priority</option>
            <option>Status</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-h-[60vh]">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-200 text-gray-700 sticky top-0">
            <tr>
              <th className="px-4 py-2">Task</th>
              {isAdmin && viewMode !== "my" && <th className="px-4 py-2">Assignee</th>}
              <th className="px-4 py-2">Due Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Priority</th>
              {!isAdmin && <th className="px-4 py-2">Request Change</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                <td className="px-4 py-2">{task.title}</td>
                {isAdmin && viewMode !== "my" && <td className="px-4 py-2">{task.assignee}</td>}
                <td className="px-4 py-2">{task.dueDate}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-md ${
                      task.status === "Done"
                        ? "bg-green-100 text-green-700"
                        : task.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-md ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>
                {!isAdmin && (
                  <td className="px-4 py-2">
                    <button className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                      Request Change
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-50 p-6 rounded-xl w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full mb-2 px-3 py-1 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Assignee"
              value={newTask.assignee}
              onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
              className="w-full mb-2 px-3 py-1 border border-gray-300 rounded-md"
            />
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="w-full mb-2 px-3 py-1 border border-gray-300 rounded-md"
            />
            <select
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value as any })}
              className="w-full mb-2 px-3 py-1 border border-gray-300 rounded-md"
            >
              <option>Todo</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
              className="w-full mb-4 px-3 py-1 border border-gray-300 rounded-md"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-800"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

