import React from "react";
import { FaBars, FaChevronLeft } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  setActiveSection: (section: string) => void; // New prop to handle section change
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  setActiveSection,
}) => {
  return (
    <div
      className={`fixed z-30 inset-y-0 left-0 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0 w-64" : "translate-x-0 w-16"
      } bg-white dark:bg-darkCard p-5`}
    >
      <div className="flex justify-end">
        <button onClick={toggleSidebar}>
          {isOpen ? (
            <FaChevronLeft className="text-black dark:text-white" />
          ) : (
            <FaBars className="text-black dark:text-white" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="mt-6 text-center">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-16 h-16 rounded-full mx-auto"
          />
          <h2 className="mt-4 text-xl font-semibold">John Doe</h2>
          <p className="text-sm text-secondary dark:text-gray-400">
            john.doe@example.com
          </p>
          <nav className="mt-6">
            <ul>
              <li className="mt-4">
                <button
                  className="block py-2 px-4 rounded hover:bg-primary dark:hover:bg-darkCard"
                  onClick={() => setActiveSection("Rooms")}
                >
                  Rooms
                </button>
              </li>
              <li className="mt-4">
                <button
                  className="block py-2 px-4 rounded hover:bg-primary dark:hover:bg-darkCard"
                  onClick={() => setActiveSection("Slots")}
                >
                  Slots
                </button>
              </li>
              <li className="mt-4">
                <button
                  className="block py-2 px-4 rounded hover:bg-primary dark:hover:bg-darkCard"
                  onClick={() => setActiveSection("Bookings")}
                >
                  Bookings
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
