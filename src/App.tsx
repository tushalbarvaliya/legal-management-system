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
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import { AnimatePresence } from "framer-motion"
import LogoutPage from "./pages/LogoutPage"

const App = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <ProtectedRouteByRole
              allowedRoles={["admin", "lawyer", "staff", "guest"]}
            >
              <></>
            </ProtectedRouteByRole>
          }
        />

        <Route
          path="/cases"
          element={
            <>
              <CasesPage />
            </>
          }
        />
        <Route path="/cases/:id" element={<></>} />
        <Route path="/cases/add" element={<></>} />
        <Route path="/cases/edit/:id" element={<></>} />
        <Route path="/cases/delete/:id" element={<></>} />

        <Route
          path="/docs"
          element={
            <>
              <DocumentPage />
            </>
          }
        />
        <Route path="/docs/:id" element={<></>} />
        <Route path="/docs/add" element={<></>} />
        <Route path="/docs/edit/:id" element={<></>} />
        <Route path="/docs/delete/:id" element={<></>} />

        <Route
          path="/client"
          element={
            <>
              <ClientPage />
            </>
          }
        />
        <Route path="/client/:id" element={<></>} />
        <Route path="/client/add" element={<></>} />
        <Route path="/client/edit/:id" element={<></>} />
        <Route path="/client/delete/:id" element={<></>} />

        <Route
          path="/staff"
          element={
            <>
              <StaffPage />
            </>
          }
        />
        <Route path="/staff/:id" element={<></>} />
        <Route path="/staff/add" element={<></>} />
        <Route path="/staff/edit/:id" element={<></>} />
        <Route path="/staff/delete/:id" element={<></>} />

        <Route
          path="/session"
          element={
            <>
              <SessionPage />
            </>
          }
        />
        <Route path="/session/:id" element={<></>} />
        <Route path="/session/add" element={<></>} />
        <Route path="/session/edit/:id" element={<></>} />
        <Route path="/session/delete/:id" element={<></>} />

        <Route
          path="/task"
          element={
            <>
              <TaskPage />
            </>
          }
        />
        <Route path="/task/:id" element={<></>} />
        <Route path="/task/add" element={<></>} />
        <Route path="/task/edit/:id" element={<></>} />
        <Route path="/task/delete/:id" element={<></>} />

        <Route
          path="/invoice"
          element={
            <>
              <InvoicePage />
            </>
          }
        />
        <Route path="/invoice/:id" element={<></>} />
        <Route path="/invoice/add" element={<></>} />
        <Route path="/invoice/edit/:id" element={<></>} />
        <Route path="/invoice/delete/:id" element={<></>} />

        <Route
          path="/profile"
          element={
            <>
              <ProfilePage />
            </>
          }
        />
        <Route
          path="/reset-password"
          element={
            <>
              <ResetPasswordPage />
            </>
          }
        />

        <Route
          path="/privacy-policy"
          element={
            <>
              <PrivacyPolicyPage />
            </>
          }
        />
        <Route
          path="/terms-and-conditions"
          element={
            <>
              <TermsAndConditionsPage />
            </>
          }
        />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/signup"
          element={
            <>
              <SignUpPage />
            </>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <>
              <ForgotPasswordPage />
            </>
          }
        />

        <Route path="/logout" element={<LogoutPage />} />
        <Route
          path="*"
          element={
            <>
              <h1>404</h1>
            </>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default App
