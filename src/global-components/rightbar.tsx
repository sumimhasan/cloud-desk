import React from "react";

interface Member {
  id: number;
  name: string;
  avatarUrl: string;
  isActive?: boolean;
}

interface RightSidebarProps {
  members: Member[];
}

const RightSidebar: React.FC<RightSidebarProps> = ({ members }) => {
  // Tailwind class variables
  const sidebarClass = "h-screen w-64 bg-gray-900 text-white flex flex-col p-4 space-y-8 overflow-y-scroll fixed right-0 top-16";
  const searchContainerClass = "p-2 mb-4";
  const searchInputClass = "w-full p-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400";
  const memberListClass = "flex-1 overflow-y-scroll space-y-4";
  const memberItemClass = "flex items-center space-x-3 p-2 bg-gray-500 rounded relative";
  const avatarWrapperClass = "relative";
  const avatarClass = "w-10 h-10 rounded-full object-cover";
  const activeIndicatorClass = "absolute top-0 right-0 block w-3 h-3 bg-green-500 rounded-full";
  const memberNameClass = "font-medium text-gray-100";

  return (
    <aside className={sidebarClass}>
      {/* Search Section */}
      <div className={searchContainerClass}>
        <input
          type="text"
          placeholder="Search members..."
          className={searchInputClass}
        />
      </div>

      {/* Member List Section */}
      <div className={memberListClass}>
        {members.map((member) => (
          <div key={member.id} className={memberItemClass}>
            <div className={avatarWrapperClass}>
              <img
                src={member.avatarUrl}
                alt={member.name}
                className={avatarClass}
              />
              {member.isActive && <span className={activeIndicatorClass}></span>}
            </div>
            <span className={memberNameClass}>{member.name}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default RightSidebar;
