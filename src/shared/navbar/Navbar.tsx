import { useState } from "react";
import { FaRegUserCircle, FaBars } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useDarkMode } from "../../DarkModeContext";
import { RxCross2 } from "react-icons/rx";
import CustomButton from "../../components/customButton/CustomButton";
import MobileNavbar from "./MobileNavbar";
import { TiWeatherSunny } from "react-icons/ti";
import { BsMoonStarsFill } from "react-icons/bs";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-darkBg py-3 px-4 fixed w-full z-30">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to={"/"}>
          <div className="flex items-center gap-1">
            <img
              src="../../../public/roomLogo (2).png"
              className="object-cover w-10 h-10 bg-primary rounded-full border-2 border-primary dark:text-white"
              alt="RoomEase Logo"
            />
            <h1 className="text-3xl text-secondary dark:text-white font-semibold">
              RoomEase
            </h1>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-12 text-xl font-semibold">
          {[
            { name: "Home", path: "/" },
            { name: "Meeting Rooms", path: "/meeting-rooms" },
            { name: "About Us", path: "/about-us" },
            { name: "Contact Us", path: "/contact-us" },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `dark:text-white text-secondary relative ${
                  isActive
                    ? "border-b-4 duration-150 dark:text-primary border-primary"
                    : ""
                }`
              }
            >
              <span className="relative pb-1 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-primary before:transition-all before:duration-300 hover:before:w-full">
                {item.name}
              </span>
            </NavLink>
          ))}

          {/* Login Button */}
          <NavLink to="/login">
            <CustomButton name={"Login"} />
          </NavLink>
        </div>
        {/* User Icon with Dropdown */}
        <div className="relative md:block hidden">
          <button
            className="flex items-center border-2 p-1 rounded-full border-primary gap-2 text-secondary dark:text-white"
            onClick={toggleUserMenu}
          >
            <FaRegUserCircle className="text-4xl" />
          </button>
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-darkBg shadow-lg rounded-lg">
              <Link
                to="/my-booking"
                className="block px-4 py-2 text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                My Booking
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  // Implement your logout logic here
                }}
              >
                Logout
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  toggleDarkMode();
                }}
              >
                {darkMode ? (
                  <div className="flex text-primary items-center gap-1">
                    <TiWeatherSunny />
                    <h1>Light</h1>
                  </div>
                ) : (
                  <div className="flex text-primary items-center gap-1">
                    <BsMoonStarsFill />
                    <h1>Dark</h1>
                  </div>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="flex md:hidden items-center">
          <button onClick={toggleDrawer}>
            <FaBars className="text-3xl dark:text-white text-secondary" />
          </button>
        </div>
      </div>

      {/* Drawer */}
      <MobileNavbar
        drawerOpen={drawerOpen}
        closeDrawer={closeDrawer}
        toggleUserMenu={toggleUserMenu}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </nav>
  );
};

export default Navbar;
