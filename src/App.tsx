import { Routes, Route, useLocation } from "react-router-dom"
import { lazy, Suspense } from "react"

import ProtectedRouteByRole from "./routes/ProtectedRouteByRole"
import { AnimatePresence } from "framer-motion"
import { Spinner } from "./components/ui/spinner"
import HomeLayout from "./pages/HomePageLayout"

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
const HomePageContent = lazy(() => import("./pages/HomePageContent"))
const CompanyPage = lazy(() => import("./pages/CompanyPage"))
const LawyerPage = lazy(() => import("./pages/LawyerPage"))
const Error = lazy(() => import("./components/ErrorPage"))
const LoginPageForm = lazy(() => import("./pages/LoginPageForm"))
const Loader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner className="size-25 text-stone-600" />
    </div>
  )
}
const App = () => {
  const location = useLocation()
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomeLayout />}>
            <Route
              path=""
              element={
                <Suspense fallback={<Loader />}>
                  <ProtectedRouteByRole
                    allowedRoles={["admin", "lawyer", "staff", "client"]}
                  >
                    <HomePageContent />
                  </ProtectedRouteByRole>
                </Suspense>
              }
            />
            <Route
              path="/company"
              element={
                <Suspense fallback={<Loader />}>
                  <ProtectedRouteByRole allowedRoles={["admin"]}>
                    <CompanyPage />
                  </ProtectedRouteByRole>
                </Suspense>
              }
            />
            <Route
              path="/lawyer"
              element={
                <Suspense fallback={<Loader />}>
                  <ProtectedRouteByRole allowedRoles={["admin"]}>
                    <LawyerPage />
                  </ProtectedRouteByRole>
                </Suspense>
              }
            />
            <Route
              path="/cases"
              element={
                <Suspense fallback={<Loader />}>
                  <ProtectedRouteByRole allowedRoles={["lawyer", "staff"]}>
                    <CasesPage />
                  </ProtectedRouteByRole>
                </Suspense>
              }
            />
            <Route
              path="/docs"
              element={
                <Suspense fallback={<Loader />}>
                  <ProtectedRouteByRole allowedRoles={["lawyer", "staff"]}>
                    <DocumentPage />
                  </ProtectedRouteByRole>
                </Suspense>
              }
            />

            <Route
              path="/client"
              element={
                <Suspense fallback={<Loader />}>
                  <ProtectedRouteByRole allowedRoles={["lawyer", "staff"]}>
                    <ClientPage />
                  </ProtectedRouteByRole>
                </Suspense>
              }
            />
            <Route
              path="/client/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <ProtectedRouteByRole allowedRoles={["lawyer", "staff"]}>
                    <ClientPage />
                  </ProtectedRouteByRole>
                </Suspense>
              }
            />
            <Route
              path="/staff"
              element={
                <Suspense fallback={<Loader />}>
                  <ProtectedRouteByRole allowedRoles={["lawyer", "admin"]}>
                    <StaffPage />
                  </ProtectedRouteByRole>
                </Suspense>
              }
            />

            <Route
              path="/session"
              element={
                <Suspense fallback={<Loader />}>
                  <ProtectedRouteByRole allowedRoles={["lawyer"]}>
                    <SessionPage />
                  </ProtectedRouteByRole>
                </Suspense>
              }
            />

            <Route
              path="/task"
              element={
                <Suspense fallback={<Loader />}>
                  <ProtectedRouteByRole allowedRoles={["lawyer", "staff"]}>
                    <TaskPage />
                  </ProtectedRouteByRole>
                </Suspense>
              }
            />

            <Route
              path="/invoice"
              element={
                <Suspense fallback={<Loader />}>
                  <ProtectedRouteByRole allowedRoles={["lawyer", "client"]}>
                    <InvoicePage />
                  </ProtectedRouteByRole>
                </Suspense>
              }
            />

            <Route
              path="/profile"
              element={
                <Suspense fallback={<Loader />}>
                  <ProfilePage />
                </Suspense>
              }
            />
            <Route
              path="/reset-password"
              element={
                <Suspense fallback={<Loader />}>
                  <ResetPasswordPage />
                </Suspense>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <Suspense fallback={<Loader />}>
                  <PrivacyPolicyPage />
                </Suspense>
              }
            />
            <Route
              path="/terms-and-conditions"
              element={
                <Suspense fallback={<Loader />}>
                  <TermsAndConditionsPage />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="/login"
            element={
              <Suspense fallback={<Loader />}>
                <LoginPageForm />
              </Suspense>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<Loader />}>
                <ForgotPasswordPage />
              </Suspense>
            }
          />
          <Route
            path="/logout"
            element={
              <Suspense fallback={<Loader />}>
                <LogoutPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loader />}>
                <Error />
              </Suspense>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
