import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const ProtectedRouteByRole = ({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.auth.role);

  useEffect(() => {
    if (!allowedRoles.includes(role)) {
      navigate("/login"); // redirect AFTER render
    }
  }, [role, allowedRoles, navigate]);

  if (!allowedRoles.includes(role)) {
    return null; // render nothing while redirecting
  }

  return children;
};

export default ProtectedRouteByRole;
