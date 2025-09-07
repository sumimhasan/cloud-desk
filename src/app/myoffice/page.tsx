"use client";

import React from "react";
import Navbar from "@/global-components/navbar";
import Sidebar from "@/global-components/sidebar";
import RightSidebar from "@/global-components/rightbar";

// Dummy data
const teamInfo = {
  name: "CloudDesk Team",
  description:
    "Our team is a diverse group of passionate professionals united by a shared vision of building innovative solutions and delivering meaningful impact. We bring together individuals from different backgrounds, skill sets, and experiences, which allows us to approach challenges from multiple perspectives and create well-rounded strategies. Each member contributes their unique strengths, whether it’s in design, development, research, or project management, and together we form a collaborative unit that thrives on creativity and problem-solving.",
  imageUrl:
    "https://media.istockphoto.com/id/1321029825/photo/portrait-of-business-team.jpg?s=612x612&w=0&k=20&c=r_mjz8nYxz7LyqL1zByr5iYxcnV48dzYwyXcXHyeE4k=",
};

const dummyMembers = [
  { id: 1, name: "Alice Johnson", avatarUrl: "https://i.pravatar.cc/150?img=1", isActive: true },
  { id: 2, name: "Bob Smith", avatarUrl: "https://i.pravatar.cc/150?img=2", isActive: false },
  { id: 3, name: "Charlie Brown", avatarUrl: "https://i.pravatar.cc/150?img=3", isActive: true },
  { id: 4, name: "Diana Prince", avatarUrl: "https://i.pravatar.cc/150?img=4", isActive: false },
  { id: 5, name: "Ethan Hunt", avatarUrl: "https://i.pravatar.cc/150?img=5", isActive: true },
];

const recentDocs = [
  { id: 1, title: "Project Plan.docx", date: "Sep 5, 2025" },
  { id: 2, title: "Design Mockup.png", date: "Sep 6, 2025" },
  { id: 3, title: "Meeting Notes.pdf", date: "Sep 7, 2025" },
];

const activeUsers = [
  { id: 1, name: "Alice Johnson", avatarUrl: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Bob Smith", avatarUrl: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Carol Lee", avatarUrl: "https://i.pravatar.cc/150?img=3" },
];

const recentActivities = [
  { id: 1, activity: "Alice completed Task #12", time: "2h ago" },
  { id: 2, activity: "Bob uploaded a new file", time: "4h ago" },
  { id: 3, activity: "Carol commented on Task #5", time: "6h ago" },
];

// Main Office Page Content
const MyOfficeContent: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto space-y-6">
      {/* 1st Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Team Card */}
        <div className="bg-gray-200 rounded-lg shadow p-4 flex space-y-4 flex-col">
          <img
            src={teamInfo.imageUrl}
            alt="Team"
            className="w-full h-fit rounded-lg object-cover"
          />
          <div>
            <h2 className="text-xl font-bold pt-6">{teamInfo.name}</h2>
            <p className="text-gray-700 mt-2">{teamInfo.description}</p>
          </div>
        </div>

        {/* Recent Documents */}
        <div className="bg-gray-200 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Recent Documents</h2>
          <ul className="space-y-2">
            {recentDocs.map((doc) => (
              <li
                key={doc.id}
                className="bg-gray-300 p-2 rounded flex justify-between items-center"
              >
                <span>{doc.title}</span>
                <span className="text-sm text-gray-600">{doc.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 2nd Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Most Active Users */}
        <div className="bg-gray-200 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Most Active Users</h2>
          <ul className="space-y-2">
            {activeUsers.map((user) => (
              <li key={user.id} className="flex items-center space-x-3">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span>{user.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Activities */}
        <div className="bg-gray-200 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Recent Activities</h2>
          <ul className="space-y-2">
            {recentActivities.map((act) => (
              <li key={act.id} className="bg-gray-300 p-2 rounded">
                <p>{act.activity}</p>
                <span className="text-sm text-gray-600">{act.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Optional 3rd Row */}
      <div className="bg-gray-300 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Announcements / Stats</h2>
        <p className="text-gray-700">
          This full-width section can be used for banners, metrics, or any other content.
        </p>
      </div>
    </div>
  );
};

// Full Page with Navbar + Sidebars
export default function MyOfficePage() {
  return (
    <>
      <Navbar />
      <div className="pt-16 flex h-screen bg-gray-300">
        {/* Left Sidebar */}
        <div className="w-64">
          <Sidebar />
        </div>

        {/* Main Area */}
        <MyOfficeContent />

        {/* Right Sidebar */}
        <div className="w-64">
          <RightSidebar members={dummyMembers} />
        </div>
      </div>
    </>
  );
}
