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
import HomePage from "./pages/HomePage.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import PublicRoute from "./routes/PublicRoute.tsx";
import { removeToken } from "./store/slices/authSlice.ts";
import LoginPageForm from "./pages/LoginPageForm.tsx";

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
            path: "profile",
            element: <ProfilePage></ProfilePage>,
          },
          {
            path: "ticket",
            element: <ProfilePage></ProfilePage>,
          },
          {
            path: "task",
            element: <ProfilePage></ProfilePage>,
          },
          {
            path: "docs",
            element: <ProfilePage></ProfilePage>,
          },
          {
            path: "cases",
            element: <ProfilePage></ProfilePage>,
          },
          {
            path: "client",
            element: <ProfilePage></ProfilePage>,
          },
          {
            path: "session",
            element: <ProfilePage></ProfilePage>,
          },
          {
            path: "tasks",
            element: <ProfilePage></ProfilePage>,
          },
          {
            path: "staff",
            element: <ProfilePage></ProfilePage>,
          },
          {
            path: "invoice",
            element: <ProfilePage></ProfilePage>,
          },
          {
            path: "privacy-policy",
            element: <ProfilePage></ProfilePage>,
          },
          {
            path: "terms-and-conditions",
            element: <LoginPageForm></LoginPageForm>,
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
        element: <SignUpPage></SignUpPage>,
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
