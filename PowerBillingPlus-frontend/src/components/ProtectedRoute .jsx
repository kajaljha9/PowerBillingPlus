// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userToken = localStorage.getItem("token");

  const adminToken = localStorage.getItem("adminToken");

  if (!userToken && !adminToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
