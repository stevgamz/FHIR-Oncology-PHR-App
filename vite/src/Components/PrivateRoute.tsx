import React from "react";
import { useAuth } from "./useAuth";
import { Navigate, Route, RouteProps, Routes } from "react-router-dom";

export const PrivateRoute: React.FC<{
  component: React.ComponentType;
}> = ({ component: Component }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Component /> : <Navigate to="/admin" />;
};
