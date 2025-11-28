import { Navigate } from "react-router-dom";
import { getAccessToken } from "./authStorage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = getAccessToken()

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const token = getAccessToken()

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}


export {
  ProtectedRoute,
  PublicRoute
}