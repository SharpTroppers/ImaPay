import { Navigate } from "react-router-dom";

export function RequireAuth({ children }: { children: React.ReactElement }) {
  const token = localStorage.getItem("Token");

  return token ? children : <Navigate to="/" replace />;
}
