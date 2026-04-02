import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { store } from "@/store/store"
import { removeAuth } from "@/store/slice/authSlice"
import { persistor } from "@/store/store"
import { queryClient } from "@/main"
import { caseAPI } from "@/store/services/caseAPI"
import { clientAPI } from "@/store/services/clientAPI"
import { taskAPI } from "@/store/services/taskAPI"
import { companyAPI } from "@/store/services/companyAPI"
import { lawyerAPI } from "@/store/services/lawyerAPI"
import { adminAPI } from "@/store/services/adminAPI"
import { profileAPI } from "@/store/services/profileAPI"
import { invoiceAPI } from "@/store/services/invoiceAPI"
import { staffAPI } from "@/store/services/staffAPI"
import { sessionAPI } from "@/store/services/sessionAPI"

export default function LogoutPage() {
  const navigate = useNavigate()

  useEffect(() => {
    queryClient.clear()
    store.dispatch(removeAuth())
    store.dispatch(caseAPI.util.resetApiState())
    store.dispatch(clientAPI.util.resetApiState())
    store.dispatch(taskAPI.util.resetApiState())
    store.dispatch(companyAPI.util.resetApiState())
    store.dispatch(lawyerAPI.util.resetApiState())
    store.dispatch(adminAPI.util.resetApiState())
    store.dispatch(profileAPI.util.resetApiState())
    store.dispatch(invoiceAPI.util.resetApiState())
    store.dispatch(staffAPI.util.resetApiState())
    store.dispatch(sessionAPI.util.resetApiState())
    persistor.purge().then(() => {
      navigate("/login", { replace: true })
    })
  }, [navigate])

  return null
}
