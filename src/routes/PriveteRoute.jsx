import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { currentUser, loading } = useAuth();

  // Wait for auth state to resolve
  if (loading) return null; // or a loader/spinner

  // Not logged in
  if (!currentUser) return <Navigate to="/login" replace />;

  // Role-based access
  if (allowedRoles && !allowedRoles.includes(currentUser?.userType)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
