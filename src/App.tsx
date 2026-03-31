import { Routes, Route, useLocation } from "react-router-dom"

import ProtectedRouteByRole from "./routes/ProtectedRouteByRole"
import CasesPage from "./pages/CasesPage"
import DocumentPage from "./pages/DocumentPage"
import ClientPage from "./pages/ClientPage"
import StaffPage from "./pages/StaffPage"
import SessionPage from "./pages/SessionPage"
import TaskPage from "./pages/TaskPage"
import InvoicePage from "./pages/InvoicePage"
import ProfilePage from "./pages/ProfilePage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage"
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import { AnimatePresence } from "framer-motion"
import LogoutPage from "./pages/LogoutPage"
import HomeLayout from "./pages/HomePageLayout"
import HomePageContent from "./pages/HomePageContent"
import CompanyPage from "./pages/CompanyPage"
import LawyerPage from "./pages/LawyerPage"
import Error from "./components/ErrorPage"
import LoginPageForm from "./pages/LoginPageForm"

const App = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeLayout />}>
          <Route
            path=""
            element={
              <ProtectedRouteByRole
                allowedRoles={["admin", "lawyer", "staff", "client",]}
              >
                <HomePageContent />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/company"
            element={
              <ProtectedRouteByRole allowedRoles={["admin"]}>
                <CompanyPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/lawyer"
            element={
              <ProtectedRouteByRole allowedRoles={["admin"]}>
                <LawyerPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/cases"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer", "staff"]}>
                <CasesPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/docs"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer", "staff"]}>
                <DocumentPage />
              </ProtectedRouteByRole>
            }
          />

          <Route
            path="/client"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer", "staff"]}>
                <ClientPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/client/:id"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer", "staff"]}>
                <ClientPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/staff"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer", "admin"]}>
                <StaffPage />
              </ProtectedRouteByRole>
            }
          />

          <Route
            path="/session"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer"]}>
                <SessionPage />
              </ProtectedRouteByRole>
            }
          />

          <Route
            path="/task"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer", "staff"]}>
                <TaskPage />
              </ProtectedRouteByRole>
            }
          />

          <Route
            path="/invoice"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer", "client"]}>
                <InvoicePage />
              </ProtectedRouteByRole>
            }
          />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditionsPage />}
          />
        </Route>

        <Route path="/login" element={<LoginPageForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
