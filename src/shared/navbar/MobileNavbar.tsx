import { RxCross2 } from "react-icons/rx";
import { FaRegUserCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { TiWeatherSunny } from "react-icons/ti";
import { BsMoonStarsFill } from "react-icons/bs";
import { useAppSelector } from "../../redux/hook";
import { logOut, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

interface MobileNavbarProps {
  drawerOpen: boolean;
  closeDrawer: () => void;
  toggleUserMenu: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  drawerOpen,
  closeDrawer,
  toggleUserMenu,
  darkMode,
  toggleDarkMode,
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const logout = useSelector(logOut);
  console.log(logout);
  const user = useAppSelector(selectCurrentUser);
  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("location");
    closeDrawer();
  };

  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
    toggleUserMenu(); // Optional, if needed based on logic
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
                {user?.image ? (
                  <img src={user?.image} className="w-8 h-8 rounded-full" alt="profile" />
                ) : (
                  <FaRegUserCircle className="text-4xl" />
                )}
                <span>User Menu</span>
              </div>
              {userMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {userMenuOpen && (
              <div className="mt-2 pl-8">
                {user?.role === "user" && (
                  <Link
                    to="/my-bookings"
                    onClick={closeDrawer}
                    className="block px-4 py-2 text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My Booking
                  </Link>
                )}
                {user?.role === "admin" && (
                  <Link
                    to="/dashboard/rooms-list"
                    onClick={closeDrawer}
                    className="block px-4 py-2 text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Dashboard
                  </Link>
                )}
                {user && (
                  <button
                    className="block text-left px-4 py-2 text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
                <button
                  className="block text-left px-4 py-2 text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    toggleDarkMode();
                    closeDrawer();
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
          {!user && (
            <NavLink
              to="/auth"
              onClick={closeDrawer}
              className="bg-primary text-center text-white py-2 px-4 rounded-md hover:bg-primary/90 transition"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
