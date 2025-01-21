import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  // Redirect unauthenticated users to login if not on login/register pages
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }
  // Redirect authenticated users away from login/register pages
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      <Navigate to="/shop/home" />;
    }
  }
  // Restrict access to admin routes for non-admin users
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }
  // Restrict access to shop routes for admin users
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Render children if none of the conditions match
  return <div>{children}</div>;
};

export default CheckAuth;
