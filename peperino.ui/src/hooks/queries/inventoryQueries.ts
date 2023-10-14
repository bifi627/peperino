import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { CreateInventoryCommand } from "../../lib/api";
import { ClientApi } from "../../lib/auth/client/apiClient";

export module InventoryQueries {
    export const inventoryQueryKey = ["getInventoryQuery"];

    export const useGetInventoryQuery = (slug: string) => {
        return useQuery({ queryKey: inventoryQueryKey, queryFn: async () => await ClientApi.inventory.getInventoryBySlug(slug) })
    }

    export const useCreateInventoryMutation = (queryClient: QueryClient, onMutate?: () => unknown | Promise<unknown>) => {
        const createInventoryMutation = useMutation({
            mutationFn: async (command: CreateInventoryCommand) => {
                await ClientApi.inventory.createInventory(command);
            },
            onSettled: async () => {
                await queryClient.invalidateQueries({ queryKey: inventoryQueryKey });
            },
            onMutate: onMutate,
        });
        return createInventoryMutation;
    }
}