
import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

// 未来App级别的provider都将直接添加在这里.
// 而这个AppProviders将App直接包裹住,也就起到了作用.

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </QueryClientProvider>
  )
}