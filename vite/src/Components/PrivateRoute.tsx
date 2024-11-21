import React from "react";
import { useAuth } from "./useAuth";
import { Navigate } from "react-router-dom";

export const PrivateRoute: React.FC<{
  component: React.ComponentType;
}> = ({ component: Component }) => {
  const { admin, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return admin ? <Component /> : <Navigate to="/admin" />;
};
