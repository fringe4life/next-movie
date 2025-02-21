"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./Main";

const  queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                staleTime: 259_200_000,
                retry: 3,
                gcTime: 259_200_000,
                retryOnMount: false,
            },
        },
    })


export default function Home() {
    return (
        <QueryClientProvider client={queryClient} >
            <Main />
        </QueryClientProvider>
    )
}