import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useAppSelector } from "@/hooks/hooks"

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate()
  const token = useAppSelector((state) => state.auth.token)

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [token, navigate])

  if (!token) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute
