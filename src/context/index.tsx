
import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { QueryClientProvider, QueryClient } from 'react-query';
import { store } from "store";
import { Provider } from "react-redux";

// 未来App级别的provider都将直接添加在这里.
// 而这个AppProviders将App直接包裹住,也就起到了作用.

export const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            <QueryClientProvider client={new QueryClient()}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </QueryClientProvider>
        </Provider>

    )

}