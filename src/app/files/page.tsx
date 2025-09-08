import React from 'react';
import Navbar from '@/global-components/navbar';
import Sidebar from '@/global-components/sidebar';
import RightSidebar from '@/global-components/rightbar';
import FilesContainer from './fileContainer';
const dummyMembers = [
  { id: 1, name: "Alice Johnson", avatarUrl: "https://i.pravatar.cc/150?img=1", isActive: true },
  { id: 2, name: "Bob Smith", avatarUrl: "https://i.pravatar.cc/150?img=2", isActive: false },
  { id: 3, name: "Charlie Brown", avatarUrl: "https://i.pravatar.cc/150?img=3", isActive: true },
  { id: 4, name: "Diana Prince", avatarUrl: "https://i.pravatar.cc/150?img=4", isActive: false },
  { id: 5, name: "Ethan Hunt", avatarUrl: "https://i.pravatar.cc/150?img=5", isActive: true },
];
export default function Test() {
  return (
    <>
      <Navbar />
      <div className="pt-16 flex h-screen">
        
        {/* Left Sidebar */}
        <div className="w-64">
          <Sidebar />
        </div>

        {/* Main Area */}
        <div className="flex-1 flex flex-col p-4 overflow-y-auto bg-gray-900">
          <FilesContainer/>
        </div>

        {/* Right Sidebar */}
        <div className="w-64">
          <RightSidebar members={dummyMembers} />
        </div>
      </div>
    </>
  );
}

