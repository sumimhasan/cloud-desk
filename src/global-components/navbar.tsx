import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faComments,
  faEnvelope,
  faTable,
  faCalendarDay,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  const links = [
    { name: "My Office", icon: faBuilding },
    { name: "Chat", icon: faComments },
    { name: "Direct Message", icon: faEnvelope },
    { name: "Worktable", icon: faTable },
    { name: "Todays Task", icon: faCalendarDay },
  ];

  // Tailwind class variables
  const navClass = "fixed hidden md:flex items-center justify-between w-full h-16 px-6 bg-gray-700 shadow z-10";
  const logoClass = "ml-2 text-2xl font-bold text-white";
  const iconWrapperClass = "w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition";
  const iconClass = "w-4 h-4 text-gray-700";
  const rightIconsClass = "flex space-x-3 mr-4";
  const bellIconClass = "w-6 h-6 text-white";

  return (
    <nav className={navClass}>
      {/* Left: Logo */}
      <div className={logoClass}>CloudDesk</div>

      {/* Center: Sidebar Icons */}
      <div className="flex space-x-4">
        {links.map((link, i) => (
          <div key={i} className={iconWrapperClass} title={link.name}>
            <FontAwesomeIcon icon={link.icon} className={iconClass} />
          </div>
        ))}
      </div>

      {/* Right: Notification Icon */}
      <div className={rightIconsClass}>
        <FontAwesomeIcon icon={faBell} className={bellIconClass} />
      </div>
    </nav>
  );
};

export default Navbar;
