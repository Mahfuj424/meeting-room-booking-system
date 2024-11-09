// src/components/DashboardLayout.tsx
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  BsMoonStarsFill,
  BsChevronLeft,
  BsChevronRight,
  BsHouseDoor,
  BsDoorOpen,
  BsCalendar2Check,
  BsClockHistory,
} from "react-icons/bs";
import { PiBookmarksSimpleFill } from "react-icons/pi";
import { TiWeatherSunny } from "react-icons/ti";
import { MdMeetingRoom, MdEventSeat } from "react-icons/md";
import { useDarkMode } from "../../DarkModeContext";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hook";
import { FaUserPen } from "react-icons/fa6";

const DashboardLayout: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`transition-all duration-300 ${
          sidebarOpen ? "w-56" : "w-16"
        } dark:bg-darkBg dark:text-white bg-gray-100 text-black shadow-md`}
      >
        <nav className="flex flex-col p-4 space-y-8 pt-14 ms-3 h-screen relative">
          <button
            className="absolute top-4 shadow dark:bg-white bg-primary text-white p-2 rounded-full right-3 text-xl dark:text-black"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <BsChevronLeft /> : <BsChevronRight />}
          </button>

          {user?.role === "admin" && (
            <>
              {/* Room Section */}
              <div>
                <h2
                  className="font-bold flex items-center cursor-pointer"
                  onClick={() => toggleSection("room")}
                >
                  <MdMeetingRoom className="mr-2" />
                  {sidebarOpen && "Room"}
                </h2>
                {openSection === "room" && sidebarOpen && (
                  <ul className="space-y-2 ml-6 mt-2">
                    <li>
                      <Link className="flex items-center" to="create-room">
                        <BsDoorOpen className="mr-2" /> Create Room
                      </Link>
                    </li>
                    <li>
                      <Link className="flex items-center" to="rooms-list">
                        <BsHouseDoor className="mr-2" /> Room List
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              {/* Slots Section */}
              <div>
                <h2
                  className="font-bold flex items-center cursor-pointer"
                  onClick={() => toggleSection("slots")}
                >
                  <MdEventSeat className="mr-2" />
                  {sidebarOpen && "Slots"}
                </h2>
                {openSection === "slots" && sidebarOpen && (
                  <ul className="space-y-2 ml-6 mt-2">
                    <li>
                      <Link className="flex items-center" to="create-slot">
                        <BsClockHistory className="mr-2" /> Create Slot
                      </Link>
                    </li>
                    <li>
                      <Link className="flex items-center" to="slots-list">
                        <BsCalendar2Check className="mr-2" /> Slots List
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              {/* Bookings Section */}
              <div>
                <h2
                  className="font-bold flex items-center cursor-pointer"
                  onClick={() => toggleSection("bookings")}
                >
                  <PiBookmarksSimpleFill className="mr-2" />
                  {sidebarOpen && "Bookings"}
                </h2>
                {openSection === "bookings" && sidebarOpen && (
                  <ul className="space-y-2 ml-6 mt-2">
                    <li>
                      <Link className="flex items-center" to="bookings">
                        <PiBookmarksSimpleFill className="mr-2" /> View Bookings
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              {/* Users Section */}
              <div>
                <h2
                  className="font-bold flex items-center cursor-pointer"
                  onClick={() => toggleSection("users")}
                >
                  <FaUserPen className="mr-2" />
                  {sidebarOpen && "Users"}
                </h2>
                {openSection === "users" && sidebarOpen && (
                  <ul className="space-y-2 ml-6 mt-2">
                    <li>
                      <Link className="flex items-center" to="users">
                        <FaUserPen className="mr-2" /> Manage Users
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </>
          )}
          <div className="mt-auto">
            <Link to="/">
              <div className="flex items-center">
                <BsHouseDoor className="mr-2" />
                {sidebarOpen && "Home"}
              </div>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="dark:bg-darkBg flex justify-between items-center dark:text-white text-black shadow-md p-4">
          <div>
            <Link to={"/"}>
              <div className="flex items-center gap-1">
                <img
                  src="https://i.ibb.co/3S7g2XP/room-Logo-2.png"
                  className="object-cover md:w-10 w-6 md:h-10 h-6 bg-primary rounded-full border-2 border-primary dark:text-white"
                  alt="RoomEase Logo"
                />
                <h1 className="md:text-2xl text-secondary dark:text-white font-semibold">
                  RoomEase
                </h1>
              </div>
            </Link>
          </div>
          <div className="relative md:block hidden">
            <div className="" onClick={toggleUserMenu}>
              <img
                src={user?.image}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
            </div>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-darkBg shadow-lg rounded-lg">
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
        </header>

        {/* Dynamic Content */}
        <main className="p-4 flex-1 h-screen overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
