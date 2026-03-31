import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { TooltipProvider } from "@/components/ui/tooltip"

import "./index.css"
import App from "./App.tsx"
import { store } from "./store/store.ts"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minute
      gcTime: 1000 * 60 * 5, // 5 minutes
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
})
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <HelmetProvider>
            <TooltipProvider>
              <App />
            </TooltipProvider>
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
)
