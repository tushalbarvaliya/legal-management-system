import { Routes, Route, useLocation } from "react-router-dom"
import { lazy, Suspense } from "react"

import ProtectedRouteByRole from "./routes/ProtectedRouteByRole"
import { AnimatePresence } from "framer-motion"

const CasesPage = lazy(() => import("./pages/CasesPage"))
const DocumentPage = lazy(() => import("./pages/DocumentPage"))
const ClientPage = lazy(() => import("./pages/ClientPage"))
const StaffPage = lazy(() => import("./pages/StaffPage"))
const SessionPage = lazy(() => import("./pages/SessionPage"))
const TaskPage = lazy(() => import("./pages/TaskPage"))
const InvoicePage = lazy(() => import("./pages/InvoicePage"))
const ProfilePage = lazy(() => import("./pages/ProfilePage"))
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"))
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"))
const TermsAndConditionsPage = lazy(
  () => import("./pages/TermsAndConditionsPage")
)
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"))
const LogoutPage = lazy(() => import("./pages/LogoutPage"))
const HomeLayout = lazy(() => import("./pages/HomePageLayout"))
const HomePageContent = lazy(() => import("./pages/HomePageContent"))
const CompanyPage = lazy(() => import("./pages/CompanyPage"))
const LawyerPage = lazy(() => import("./pages/LawyerPage"))
const Error = lazy(() => import("./components/ErrorPage"))
const LoginPageForm = lazy(() => import("./pages/LoginPageForm"))
const App = () => {
  const location = useLocation()
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomeLayout />}>
            <Route
              path=""
              element={
                <ProtectedRouteByRole
                  allowedRoles={["admin", "lawyer", "staff", "client"]}
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
    </Suspense>
  )
}

export default App
