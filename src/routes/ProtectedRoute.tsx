import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const token = useSelector((state:RootState) => state.auth.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
}

export default ProtectedRoute;