import { useState } from "react";
import {
  Home,
  Users,
  Folder,
  Calendar,
  FileText,
  BarChart,
  PanelLeft,
  PanelRight,
  LogOut,
} from "lucide-react";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [openDropdown, setOpenDropdown] = useState(null);

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} /> },
    {
      name: "Teams",
      icon: <Users size={20} />,
      children: [
        { name: "Team A", href: "#" },
        { name: "Team B", href: "#" },
      ],
    },
    {
      name: "Projects",
      icon: <Folder size={20} />,
      children: [
        { name: "Project 1", href: "#" },
        { name: "Project 2", href: "#" },
      ],
    },
    { name: "Calendar", icon: <Calendar size={20} /> },
    { name: "Documents", icon: <FileText size={20} /> },
    { name: "Reports", icon: <BarChart size={20} /> },
  ];

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-gray-900 flex flex-col justify-between transition-all duration-300`}
      >
        {/* Top section */}
        <div>
          <div
            className={`flex items-center px-4 py-4 ${
              isOpen ? "justify-between" : "justify-center"
            }`}
          >
            {isOpen && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-indigo-500 rounded-full"></div>
                <span className="text-white font-bold text-lg">Sidebar</span>
              </div>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative group p-2 rounded-lg bg-indigo-500 hover:bg-indigo-700 transition flex items-center justify-center"
            >
              {isOpen ? <PanelLeft size={20} /> : <PanelRight size={20} />}
              <span
                className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 
                 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 
                 whitespace-nowrap transition"
              >
                {isOpen ? "Close Sidebar" : "Open Sidebar"}
              </span>
            </button>
          </div>

          {/* Menu */}
          <ul className="mt-6 space-y-2">
            {menuItems.map((item) => (
              <li key={item.name} className="relative group mx-4">
                <button
                  onClick={() =>
                    item.children
                      ? toggleDropdown(item.name)
                      : setActiveItem(item.name)
                  }
                  className={`flex items-center justify-between w-full gap-3 px-3 py-2 rounded-lg transition
      ${
        activeItem === item.name
          ? "bg-indigo-500 hover:bg-indigo-700 text-white"
          : "text-gray-300 hover:bg-gray-800"
      }`}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {isOpen && item.name}
                  </span>
                  {item.children && isOpen && (
                    <span
                      className={`transform transition ${
                        openDropdown === item.name ? "rotate-90" : ""
                      }`}
                    >
                      ▶
                    </span>
                  )}
                </button>

                {!isOpen && (
                  <span
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 
                               text-sm text-white bg-gray-700 rounded opacity-0 
                               group-hover:opacity-100 whitespace-nowrap transition"
                  >
                    {item.name}
                  </span>
                )}

                {item.children && openDropdown === item.name && isOpen && (
                  <ul className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-3">
                    {item.children.map((child) => (
                      <li key={child.name}>
                        <a
                          href={child.href}
                          onClick={() => setActiveItem(child.name)}
                          className={`block rounded-md text-sm px-3 py-1 transition w-full
              ${
                activeItem === child.name
                  ? "bg-indigo-500 hover:bg-indigo-700 text-white"
                  : "text-gray-400 hover:bg-gray-700"
              }`}
                        >
                          {child.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom user section */}
        <div className="flex items-center justify-between gap-2 p-4 py-4 border-t border-gray-800">
          {isOpen && (
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/40"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-white">User Name</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            </div>
          )}
          <div className="p-4">
            <button
              onClick={() => alert("Logout clicked")} // ganti sesuai logic logout kamu
              className="relative group flex items-center justify-center w-full rounded-lg hover:bg-gray-800 text-gray-300 hover:text-red-500 transition"
            >
              <LogOut size={20} />

              {/* Tooltip saat sidebar collapse */}
              {!isOpen && (
                <span
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1
          text-xs text-white bg-gray-700 rounded opacity-0
          group-hover:opacity-100 whitespace-nowrap transition"
                >
                  Logout
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-gray-100 p-6 transition-all duration-300">
        <h1 className="text-2xl font-bold">Main Content</h1>
        <p className="mt-4 text-gray-700">
          This content area is always on the right and adjusts automatically
          when the sidebar expands or collapses.
        </p>
      </div>
    </div>
  );
}
