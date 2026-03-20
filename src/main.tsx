import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, redirect } from "react-router";
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import "./index.css";

import { persistor, store } from "./store/store.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import HomePage from "./pages/HomeLayout.tsx";
import { removeToken } from "./store/slices/authSlice.ts";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.tsx";
import TermsAndConditions from "./pages/TermsAndConditions.tsx";
import LoginPageForm from "./pages/LoginPageForm.tsx";
import HomePageContent from "./pages/HomePageContent.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
// import DocsPage from "./pages/DocsPage.tsx";
import ClientPage from "./pages/ClientPage.tsx";
import DocsPage from "./pages/DocsPage.tsx";
import CasesPage from "./pages/CasesPage.tsx";
import SessionPage from "./pages/SessionPage.tsx";
import TaskPage from "./pages/TaskPage.tsx";
import StaffPage from "./pages/StaffPage.tsx";
import InvoicePage from "./pages/InvoicePage.tsx";
import LawyerPage from "./pages/LawyerPage.tsx";
import CompanyPage from "./pages/CompanyPage.tsx";
import ProtectedRouteByRole from "./routes/ProtectedRouteByRole.tsx";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRouteByRole allowedRoles={["admin"]}>
            <HomePageContent />
          </ProtectedRouteByRole>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRouteByRole allowedRoles={["admin", "staff", "lawyer"]}>
            <ProfilePage />
          </ProtectedRouteByRole>
        ),
      },
      {
        path: "company",
        element: (
          <ProtectedRouteByRole allowedRoles={["admin"]}>
            <CompanyPage />
          </ProtectedRouteByRole>
        ),
      },
      {
        path: "cases",
        element: (
          <ProtectedRouteByRole allowedRoles={["lawyer", "staff"]}>
            <CasesPage />
          </ProtectedRouteByRole>
        ),
      },
      {
        path: "session",
        element: (
          <ProtectedRouteByRole allowedRoles={["lawyer"]}>
            <SessionPage />
          </ProtectedRouteByRole>
        ),
      },
      {
        path: "tasks",
        element: (
          <ProtectedRouteByRole allowedRoles={["staff", "lawyer"]}>
            <TaskPage />
          </ProtectedRouteByRole>
        ),
      },
      {
        path: "staff",
        element: (
          <ProtectedRouteByRole allowedRoles={["lawyer"]}>
            <StaffPage />
          </ProtectedRouteByRole>
        ),
      },
      {
        path: "invoice",
        element: (
          <ProtectedRouteByRole allowedRoles={["lawyer"]}>
            <InvoicePage />
          </ProtectedRouteByRole>
        ),
      },
      {
        path: "docs",
        element: (
          <ProtectedRouteByRole allowedRoles={["lawyer", "admin"]}>
            <DocsPage />
          </ProtectedRouteByRole>
        ),
      },
      {
        path: "client",
        element: (
          <ProtectedRouteByRole allowedRoles={["lawyer", "client"]}>
            <ClientPage />
          </ProtectedRouteByRole>
        ),
      },
      {
        path: "lawyer",
        element: (
          <ProtectedRouteByRole allowedRoles={["admin"]}>
            <LawyerPage />
          </ProtectedRouteByRole>
        ),
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "reset-password",
        element: (
          <ProtectedRouteByRole
            allowedRoles={["admin", "lawyer", "staff", "guest", "client"]}
          >
            <ResetPassword />
          </ProtectedRouteByRole>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPageForm />,
  },
  {
    path: "/signUp",
    element: <SignUpPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },

  {
    path: "/logout",
    loader: () => {
      store.dispatch(removeToken());
      persistor.purge();
      return redirect("/login");
    },
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
