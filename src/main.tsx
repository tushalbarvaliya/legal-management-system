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
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import PublicRoute from "./routes/PublicRoute.tsx";
import { removeToken } from "./store/slices/authSlice.ts";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.tsx";
import TermsAndConditions from "./pages/TermsAndConditions.tsx";
import LoginPageForm from "./pages/LoginPageForm.tsx";
import HomePageContent from "./pages/HomePageContent.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import DocsPage from "./pages/DocsPage.tsx";
import ClientPage from "./pages/ClientPage.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [
          {
            path: "",
            element: <HomePageContent />,
          },
          {
            path: "/admin-panel",
            element: <AdminPage />,
          },
          {
            path: "profile",
            element: <ProfilePage/>,
          },
          {
            path: "ticket",
            element: <ProfilePage/>,
          },
          {
            path: "task",
            element: <ProfilePage/>,
          },
          {
            path: "docs",
            element: <DocsPage/>,
          },
          {
            path: "cases",
            element: <ProfilePage/>,
          },
          {
            path: "client",
            element: <ClientPage/>,
          },
          {
            path: "session",
            element: <ProfilePage/>,
          },
          {
            path: "tasks",
            element: <ProfilePage/>,
          },
          {
            path: "staff",
            element: <ProfilePage/>,
          },
          {
            path: "invoice",
            element: <ProfilePage/>,
          },
          {
            path: "privacy-policy",
            element: <PrivacyPolicyPage/>,
          },
          {
            path: "terms-and-conditions",
            element: <TermsAndConditions/>,
          },
          {
            path: "reset-password",
            element: <ResetPassword/>,
          },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPageForm />,
      },
      {
        path: "/signUp",
        element: <SignUpPage/>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword/>,
      },
    ],
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
