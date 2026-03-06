import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import "./index.css";

import { persistor, store } from "./store/store.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import LogOutPage from "./pages/LogOutPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import HomePage from "./pages/HomePage.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
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
        path: "privacy-policy",
        element: <ProfilePage></ProfilePage>,
      },
      {
        path: "terms-and-conditions",
        element: <ProfilePage></ProfilePage>,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signUp",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/logout",
    element: <LogOutPage></LogOutPage>,
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
