import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";

import { persistor } from "./store/store.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import LogOutPage from "./pages/LogOutPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import App from "./App.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
  {
    path: "/profile",
    element: <ProfilePage></ProfilePage>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </PersistGate>
  </StrictMode>,
);
