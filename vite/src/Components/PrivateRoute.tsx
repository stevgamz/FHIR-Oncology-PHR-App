import React, { useEffect } from "react";
import { useAuth } from "./useAuth";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  component: React.FC;
  isAdminRoute?: boolean | null;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  isAdminRoute = false,
}) => {
  const { users, loading, isAdmin } = useAuth();

  useEffect(() => {
    if (isAdmin && location.pathname !== "/admin/dashboard") {
      window.location.href = "/admin/dashboard";
    }
  }, [isAdmin]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!users) {
    return <Navigate to="/" />;
  }

  if (isAdminRoute && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <Component />;
};
