import { Navigate } from "react-router-dom"
import { useAppSelector } from "@/hooks/hooks"

interface ProtectedRouteProps {
  allowedRoles: string[]
  children: React.ReactNode
}

const ProtectedRouteByRole = ({
  allowedRoles,
  children,
}: ProtectedRouteProps) => {
  const { role, token } = useAppSelector((state) => state.auth)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default ProtectedRouteByRole