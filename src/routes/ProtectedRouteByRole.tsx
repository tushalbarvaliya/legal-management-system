import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useAppSelector } from "@/hooks/hooks"

interface ProtectedRouteProps {
  allowedRoles: string[]
  children: React.ReactNode
}

const ProtectedRouteByRole = ({
  allowedRoles,
  children,
}: ProtectedRouteProps) => {
  const navigate = useNavigate()
  let role = useAppSelector((state) => state.auth.role)
  const token = useAppSelector((state) => state.auth.token)
  if (role == "") {
    role = "client"
  }
  useEffect(() => {
    if (!role || !allowedRoles.includes(role)) {
      navigate("/login")
    }
  }, [role, allowedRoles, navigate, token])

  if (!role || !allowedRoles.includes(role)) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRouteByRole
