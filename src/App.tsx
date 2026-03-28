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
import SignUpPage from "./pages/SignUpPage"
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
                allowedRoles={["admin", "lawyer", "staff", "client", "null"]}
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
            path="/cases/:id"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer", "staff"]}>
                <CasesPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/cases/add"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer"]}>
                <CasesPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/cases/edit/:id"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer", "staff"]}>
                <CasesPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/cases/delete/:id"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer"]}>
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
            path="/docs/:id"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer", "staff"]}>
                <DocumentPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/docs/add"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer", "staff"]}>
                <DocumentPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/docs/edit/:id"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer", "staff"]}>
                <DocumentPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/docs/delete/:id"
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
            path="/client/add"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer"]}>
                <ClientPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/client/edit/:id"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer"]}>
                <ClientPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/client/delete/:id"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer"]}>
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
            path="/staff/:id"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer", "admin"]}>
                <StaffPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/staff/add"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer"]}>
                <StaffPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/staff/edit/:id"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer", "admin"]}>
                <StaffPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/staff/delete/:id"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer"]}>
                <StaffPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/staff/block/:id"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer"]}>
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
            path="/session/:id"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer"]}>
                <SessionPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/session/add"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer"]}>
                <SessionPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/session/edit/:id"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer"]}>
                <SessionPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/session/delete/:id"
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
            path="/task/:id"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer", "staff"]}>
                <TaskPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/task/add"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer", "staff"]}>
                <TaskPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/task/edit/:id"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer", "staff"]}>
                <TaskPage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/task/delete/:id"
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
          <Route
            path="/invoice/:id"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer", "client"]}>
                <InvoicePage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/invoice/add"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer"]}>
                <InvoicePage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/invoice/edit/:id"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer"]}>
                <InvoicePage />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/invoice/delete/:id"
            element={
              <ProtectedRouteByRole allowedRoles={["lawyer"]}>
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
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
