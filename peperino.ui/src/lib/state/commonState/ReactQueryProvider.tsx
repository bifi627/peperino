import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface Props {
    children: React.ReactNode;
}

export const ReactQueryProvider = (props: Props) => {
    const client = new QueryClient();
    return (
        <QueryClientProvider client={client}>
            {props.children}
            <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
        </QueryClientProvider>
    );
};
