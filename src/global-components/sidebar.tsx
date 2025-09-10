import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faComments,
  faEnvelope,
  faTable,
  faCalendarDay,
  faFileZipper,
  faFileLines,
  faFilePen
} from "@fortawesome/free-solid-svg-icons";

const Sidebar: React.FC = () => {
  const links = [
    { name: "My Office", icon: faBuilding },
    { name: "Chat", icon: faComments },
    { name: "Direct Message", icon: faEnvelope },
    { name: "Worktable", icon: faTable },
    { name: "Todays Task", icon: faCalendarDay },
  ];

  // Tailwind class variables
  const sidebarClass = "w-64 h-full bg-gray-900 text-white flex flex-col p-4 space-y-8 overflow-y-scroll";
  const groupClass = "flex flex-col space-y-3";
  const linkItemClass = "h-12 bg-gray-700 rounded-[35px] flex items-center px-4 cursor-pointer hover:bg-gray-600 transition";
  const linkIconClass = "mr-3 w-4 h-4";
  const linkTextClass = "text-base";
  const groupBoxClass = "h-24 bg-gray-700 rounded-[10px] flex items-center justify-center cursor-pointer hover:bg-gray-600 transition";
  const groupBoxLargeClass = "h-48 bg-gray-700 rounded-[10px] flex items-center justify-center cursor-pointer hover:bg-gray-600 transition";
  const groupBoxSmallClass = "h-16 bg-gray-700 rounded-[10px] flex items-center justify-center cursor-pointer hover:bg-gray-600 transition";

  return (
    <aside className={sidebarClass}>
      {/* Group 1 */}
      <div className={groupClass}>
        {links.map((link, i) => (
          <div key={i} className={linkItemClass}>
            <FontAwesomeIcon icon={link.icon} className={linkIconClass} />
            <span className={linkTextClass}>{link.name}</span>
          </div>
        ))}
      </div>

      {/* Group 2 */}
      <div>
        <div className={groupBoxClass}>
          <div><FontAwesomeIcon icon={faFileZipper} size="2x" className="hover:text-gray-300"/></div>
          <div><FontAwesomeIcon icon={faFileLines}  size="2x" className="hover:text-gray-300"/></div>
          <div><FontAwesomeIcon icon={faFilePen}    size="2x" className="hover:text-gray-300"/></div>
        </div>
      </div>

      {/* Group 3 */}
      <div className={groupClass}>
        <div className={groupBoxLargeClass}>
        </div>
        <div className={groupBoxLargeClass}>

        </div>
        <div className={groupBoxSmallClass}>
          {/* Last one like group 2 */}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
