import { QueryCache, QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { toast } from "sonner";
import type { AppRouter } from "../../../backend/src/routers";

export const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error) => {
			toast.error(error.message, {
				action: {
					label: "retry",
					onClick: () => {
						queryClient.invalidateQueries();
					},
				},
			});
		},
	}),
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const trpcClient = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/trpc`,
			fetch(url, options) {
				return fetch(url, {
					...options,
					credentials: "include",
				});
			},
		}),
	],
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const trpc = createTRPCOptionsProxy<AppRouter>({
	client: trpcClient,
	queryClient,
});
