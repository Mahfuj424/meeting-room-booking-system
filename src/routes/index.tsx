import MeetingRooms from "../pages/meetingRooms/MeetingRooms";
import Home from "../home/home/Home";
import Main from "../layout/Main";
import { createBrowserRouter } from "react-router-dom";
import ContactUs from "../pages/contactUs/ContactUs";
import AboutUs from "../pages/aboutUs/AboutUs";
import AuthPage from "../shared/login/Login";

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
]);

export default router;
