import PrivateRoute from "../pages/privateRoute/PrivateRoute";
import RoomDetails from "../pages/roomDetails/RoomDetails";
import Home from "../home/home/Home";
import Main from "../layout/Main";
import { createBrowserRouter } from "react-router-dom";
import ContactUs from "../pages/contactUs/ContactUs";
import AboutUs from "../pages/aboutUs/AboutUs";
import AuthPage from "../shared/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import ErrorPage from "../pages/error/ErrorPage";
import BookingProcess from "../pages/bookingProcess/BookingProcess";
import Checkout from "../pages/checkout/Checkout";
import BookingSummary from "../pages/bookingSummary/BookingSummary";
import MyBooking from "../pages/myBooking/MyBooking";
import PaymentSucces from "../pages/payment/PaymentSucces";
import MeetingRooms from "../pages/meetingRooms/MeetingRooms";
import CreateRoom from "../pages/dashboard/D-component/admin/room/CreateRoom";
import RoomList from "../pages/dashboard/D-component/admin/room/RoomList";
import CreateSlot from "../pages/dashboard/D-component/admin/slot/CreateSlots";
import SlotsList from "../pages/dashboard/D-component/admin/slot/SlotsList";
import Booking from "../pages/dashboard/D-component/user/BookingList";

// Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
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
        path: "/roomDetails/:id",
        element: (
          <PrivateRoute>
            <RoomDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/booking-process/:id",
        element: <BookingProcess />,
      },
      {
        path: "/my-bookings",
        element: <MyBooking />,
      },
      {
        path: "/booking-summary",
        element: <BookingSummary />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "/auth", // Login page path
    element: <AuthPage />,
  },
  {
    path: "/succes",
    element: <PaymentSucces />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
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
        path: "bookings",
        element: <Booking />,
      },
    ],
  },
]);

export default router;
