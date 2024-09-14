import { useAppSelector } from "../../redux/hook";
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

interface PrivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // Get user from Redux store
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem("location", location.pathname);
  }, [location.pathname]);

  if (!user) {
    // If no user, redirect to login page
    return (
      <Navigate
        to="/auth"
        replace
        state={{ from: window.location.pathname }} // Save the current location for redirect after login
      />
    );
  }

  // Render the children or an outlet for nested routes
  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
