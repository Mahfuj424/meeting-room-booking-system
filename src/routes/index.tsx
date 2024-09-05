import MeetingRooms from "../pages/meetingRooms/MeetingRooms";
import Home from "../home/home/Home";
import Main from "../layout/Main";
import { createBrowserRouter } from "react-router-dom";
import ContactUs from "../pages/contactUs/ContactUs";
import AboutUs from "../pages/aboutUs/AboutUs";
import AuthPage from "../shared/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import CreateRoom from "../pages/dashboard/D-component/admin/room/CreateRoom";
import RoomList from "../pages/dashboard/D-component/admin/room/RoomList";
import CreateSlot from "../pages/dashboard/D-component/admin/CreateSlots";
import SlotsList from "../pages/dashboard/D-component/admin/SlotsList";
import Booking from "../pages/dashboard/D-component/user/BookingList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/meeting-rooms",
        element: <MeetingRooms />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "create-room",
        element: <CreateRoom />,
      },
      {
        path: "rooms-list",
        element: <RoomList />,
      },
      {
        path: "create-slot",
        element: <CreateSlot />,
      },
      {
        path: "slots-list",
        element: <SlotsList />,
      },
      {
        path: "my-bookings",
        element: <Booking />,
      },
    ],
  },
]);

export default router;
