import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // state-ის ტიპად Any ან პირდაპირ state.auth-ის შემოწმება
  const isAuthenticated = useSelector(
    (state: any) => state.auth?.isAuthenticated || state.auth?.isLoggedIn,
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
