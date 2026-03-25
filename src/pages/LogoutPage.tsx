import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { store } from "@/store/store"
import { removeAuth } from "@/store/slice/authSlice"
import { persistor } from "@/store/store"

export default function LogoutPage() {
  const navigate = useNavigate()

  useEffect(() => {
    store.dispatch(removeAuth())
    persistor.purge().then(() => {
      navigate("/login", { replace: true })
    })
  }, [navigate])

  return null
}
