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
import HomeLayout from "./pages/HomePageLayout"
import HomePageContent from "./pages/HomePageContent"
import CompanyPage from "./pages/CompanyPage"
import LawyerPage from "./pages/LawyerPage"

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
                allowedRoles={["admin", "lawyer", "staff", "guest"]}
              >
                <HomePageContent />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/company"
            element={
              <>
                <CompanyPage />
              </>
            }
          />
          <Route
            path="/lawyer"
            element={
              <>
                <LawyerPage />
              </>
            }
          />
          <Route
            path="/lawyer/:id"
            element={
              <>
                <LawyerPage />
              </>
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
          <Route
            path="/cases/:id"
            element={
              <>
                <CasesPage />
              </>
            }
          />
          <Route
            path="/cases/add"
            element={
              <>
                <CasesPage />
              </>
            }
          />
          <Route
            path="/cases/edit/:id"
            element={
              <>
                <CasesPage />
              </>
            }
          />
          <Route
            path="/cases/delete/:id"
            element={
              <>
                <CasesPage />
              </>
            }
          />

          <Route
            path="/docs"
            element={
              <>
                <DocumentPage />
              </>
            }
          />
          <Route
            path="/docs/:id"
            element={
              <>
                <DocumentPage />
              </>
            }
          />
          <Route
            path="/docs/add"
            element={
              <>
                <DocumentPage />
              </>
            }
          />
          <Route
            path="/docs/edit/:id"
            element={
              <>
                <DocumentPage />
              </>
            }
          />
          <Route
            path="/docs/delete/:id"
            element={
              <>
                <DocumentPage />
              </>
            }
          />

          <Route
            path="/client"
            element={
              <>
                <ClientPage />
              </>
            }
          />
          <Route
            path="/client/:id"
            element={
              <>
                <ClientPage />
              </>
            }
          />
          <Route
            path="/client/add"
            element={
              <>
                <ClientPage />
              </>
            }
          />
          <Route
            path="/client/edit/:id"
            element={
              <>
                <ClientPage />
              </>
            }
          />
          <Route
            path="/client/delete/:id"
            element={
              <>
                <ClientPage />
              </>
            }
          />

          <Route
            path="/staff"
            element={
              <>
                <StaffPage />
              </>
            }
          />
          <Route
            path="/staff/:id"
            element={
              <>
                <StaffPage />
              </>
            }
          />
          <Route
            path="/staff/add"
            element={
              <>
                <StaffPage />
              </>
            }
          />
          <Route
            path="/staff/edit/:id"
            element={
              <>
                <StaffPage />
              </>
            }
          />
          <Route
            path="/staff/delete/:id"
            element={
              <>
                <StaffPage />
              </>
            }
          />

          <Route
            path="/session"
            element={
              <>
                <SessionPage />
              </>
            }
          />
          <Route
            path="/session/:id"
            element={
              <>
                <SessionPage />
              </>
            }
          />
          <Route
            path="/session/add"
            element={
              <>
                <SessionPage />
              </>
            }
          />
          <Route
            path="/session/edit/:id"
            element={
              <>
                <SessionPage />
              </>
            }
          />
          <Route
            path="/session/delete/:id"
            element={
              <>
                <SessionPage />
              </>
            }
          />

          <Route
            path="/task"
            element={
              <>
                <TaskPage />
              </>
            }
          />
          <Route
            path="/task/:id"
            element={
              <>
                <TaskPage />
              </>
            }
          />
          <Route
            path="/task/add"
            element={
              <>
                <TaskPage />
              </>
            }
          />
          <Route
            path="/task/edit/:id"
            element={
              <>
                <TaskPage />
              </>
            }
          />
          <Route
            path="/task/delete/:id"
            element={
              <>
                <TaskPage />
              </>
            }
          />

          <Route
            path="/invoice"
            element={
              <>
                <InvoicePage />
              </>
            }
          />
          <Route
            path="/invoice/:id"
            element={
              <>
                <InvoicePage />
              </>
            }
          />
          <Route
            path="/invoice/add"
            element={
              <>
                <InvoicePage />
              </>
            }
          />
          <Route
            path="/invoice/edit/:id"
            element={
              <>
                <InvoicePage />
              </>
            }
          />
          <Route
            path="/invoice/delete/:id"
            element={
              <>
                <InvoicePage />
              </>
            }
          />

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
        </Route>
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
