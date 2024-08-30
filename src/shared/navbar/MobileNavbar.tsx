import { RxCross2 } from "react-icons/rx";
import {
  FaRegUserCircle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { NavLink, Link } from 'react-router-dom';
import { useState } from "react";

const MobileNavbar = ({ drawerOpen, closeDrawer, toggleUserMenu, darkMode, toggleDarkMode }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
        drawerOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={closeDrawer}
        ></div>
      )}
      <div className="fixed left-0 top-0 w-72 bg-white dark:bg-darkBg h-full shadow-lg transition-transform duration-300 ease-in-out">
        <button
          onClick={closeDrawer}
          className="absolute top-4 right-4 text-secondary dark:text-white"
        >
          <RxCross2 className="text-2xl" />
        </button>

        <div className="flex flex-col gap-6 p-6 text-xl font-semibold mt-7">
          {/* User Menu in Drawer */}
          <div>
            <button
              className="flex items-center justify-between w-full text-left dark:text-white text-secondary"
              onClick={handleUserMenuToggle}
            >
              <div className="flex items-center gap-2">
                <FaRegUserCircle className="text-4xl" />
                <span>User Menu</span>
              </div>
              {userMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {userMenuOpen && (
              <div className="mt-2 pl-8">
                <Link
                  to="/my-booking"
                  onClick={closeDrawer}
                  className="block px-4 py-2 text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  My Booking
                </Link>
                <button
                  className="block text-left px-4 py-2 text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    // Implement your logout logic here
                    closeDrawer();
                  }}
                >
                  Logout
                </button>
                <button
                  className="block text-left px-4 py-2 text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    toggleDarkMode();
                    closeDrawer();
                  }}
                >
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
            )}
          </div>

          {[
            { name: "Home", path: "/" },
            { name: "Meeting Rooms", path: "/meeting-rooms" },
            { name: "About Us", path: "/about-us" },
            { name: "Contact Us", path: "/contact-us" },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeDrawer}
              className={({ isActive }) =>
                `dark:text-white text-secondary ${
                  isActive ? "dark:text-primary text-primary font-bold" : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <NavLink
            to="/login"
            onClick={closeDrawer}
            className="bg-primary text-center text-white py-2 px-4 rounded-md hover:bg-primary/90 transition"
          >
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
