import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddInventoryItemCommand, CreateInventoryCommand, InventoryCheckListItemOutDto, InventoryOutDto } from "../../lib/api";
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

    export const useAddIventoryItemMutation = (onMutate?: () => unknown | Promise<unknown>) => {
        const queryClient = useQueryClient();
        const addInventoryItemMutation = useMutation({
            mutationFn: async (command: AddInventoryItemCommand) => {
                await ClientApi.inventory.addInventoryItem(command);
            },
            onSettled: async () => {
                await queryClient.invalidateQueries({ queryKey: inventoryQueryKey });
            },
            onMutate: async (command) => {
                await onMutate?.();
                await queryClient.cancelQueries(inventoryQueryKey);
                const previousValues = queryClient.getQueryData<InventoryOutDto>(inventoryQueryKey);

                const newValue: InventoryCheckListItemOutDto = {
                    text: command.text,
                    quantity: command.quantity,
                    unit: command.unit,
                    id: 0,
                    itemType: { variant: "Inventory", name: "", description: "" },
                    sortIndex: 9999,
                    checked: false,
                } as InventoryCheckListItemOutDto;

                queryClient.setQueryData<InventoryOutDto>(inventoryQueryKey, (old) => {
                    old?.entities.push(newValue);
                    return old;
                });

                return previousValues;
            },
        });

        return addInventoryItemMutation;
    }
}