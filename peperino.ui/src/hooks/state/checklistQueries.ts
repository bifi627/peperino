import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BaseCheckListItemOutDto, InventoryCheckListItemInDto, InventoryCheckListItemOutDto, InventoryOutDto, RearrangeCheckListItemsInDto, TextCheckListItemInDto } from "../../lib/api";
import { ClientApi } from "../../lib/auth/client/apiClient";

export module CheckListQueries {
    export const computeQueryKey = (slug: string) => [`getCheckListQuery-${slug}]}`];

    export const useGetCheckListQuery = (slug: string) => {
        return useQuery({
            queryKey: computeQueryKey(slug),
            queryFn: async () => await ClientApi.checkList.getCheckListBySlug(slug),
        });
    }

    export const useAddIventoryItemMutation = (slug: string) => {
        const queryClient = useQueryClient();

        const addInventoryItemMutation = useMutation({
            mutationFn: async (dto: InventoryCheckListItemInDto) => {
                await ClientApi.checkListItem.addInventoryItem(slug, dto)
            },
            onSettled: async () => {
                await queryClient.invalidateQueries({ queryKey: computeQueryKey(slug) })
            },
            onError: async () => {
                await queryClient.invalidateQueries({ queryKey: computeQueryKey(slug) });
            },
            onMutate: async (command) => {
                await queryClient.cancelQueries(computeQueryKey(slug));
                const previousValues = queryClient.getQueryData<InventoryOutDto>(computeQueryKey(slug));

                const newValue: InventoryCheckListItemOutDto = {
                    text: command.text,
                    quantity: command.quantity,
                    unit: command.unit,
                    id: 0,
                    itemType: { variant: "Inventory", name: "", description: "" },
                    sortIndex: 9999,
                    checked: false,
                } as InventoryCheckListItemOutDto;

                queryClient.setQueryData<InventoryOutDto>(computeQueryKey(slug), (old) => {
                    old?.entities.push(newValue);
                    return old;
                });

                return previousValues;
            },
        });

        return addInventoryItemMutation;
    }

    export const useAddTextItemMutation = (slug: string) => {
        const queryClient = useQueryClient();

        const addInventoryItemMutation = useMutation({
            mutationFn: async (dto: TextCheckListItemInDto) => {
                await ClientApi.checkListItem.addTextItem(slug, dto)
            },
            onSettled: async () => {
                await queryClient.invalidateQueries({ queryKey: computeQueryKey(slug) })
            },
            onError: async () => {
                await queryClient.invalidateQueries({ queryKey: computeQueryKey(slug) });
            },
            onMutate: async (command) => {
                await queryClient.cancelQueries(computeQueryKey(slug));
                const previousValues = queryClient.getQueryData<InventoryOutDto>(computeQueryKey(slug));

                const newValue: InventoryCheckListItemOutDto = {
                    text: command.text,
                    id: 0,
                    itemType: { variant: "Text", name: "", description: "" },
                    sortIndex: 9999,
                    checked: false,
                } as InventoryCheckListItemOutDto;

                queryClient.setQueryData<InventoryOutDto>(computeQueryKey(slug), (old) => {
                    old?.entities.push(newValue);
                    return old;
                });

                return previousValues;
            },
        });

        return addInventoryItemMutation;
    }

    export const useUpdateItemMutation = (slug: string) => {
        const queryClient = useQueryClient();

        const updateItemMutation = useMutation({
            mutationFn: async (item: BaseCheckListItemOutDto) => {
                await ClientApi.checkListItem.updateCheckListItem(slug, item);
            },
            onSettled: async () => {
                await queryClient.invalidateQueries({ queryKey: computeQueryKey(slug) })
            },
            onError: async () => {
                await queryClient.invalidateQueries({ queryKey: computeQueryKey(slug) });
            },
        });

        return updateItemMutation;
    }

    export const useDeleteItemMutation = (slug: string) => {
        const queryClient = useQueryClient();

        const deleteItem = useMutation({
            mutationFn: async (id: number) => {
                await ClientApi.checkListItem.deleteCheckListItem(slug, id);
            },
            onSettled: async () => {
                await queryClient.invalidateQueries({ queryKey: computeQueryKey(slug) })
            },
            onError: async () => {
                await queryClient.invalidateQueries({ queryKey: computeQueryKey(slug) });
            },
            onMutate: async (id: number) => {
                await queryClient.cancelQueries(computeQueryKey(slug));

                const newData = queryClient.setQueryData<InventoryOutDto>(computeQueryKey(slug), (previousValues) => {
                    const index = previousValues?.entities.findIndex(e => e.id == id);
                    if (index && index > -1) {
                        previousValues?.entities.splice(index, 1);
                    }
                    return previousValues;
                });

                return { newData }
            },
        });

        return deleteItem;
    }

    export const useArrangeItemsMutation = (slug: string) => {
        const queryClient = useQueryClient();

        const asrrangeItems = useMutation({
            mutationFn: async (request: RearrangeCheckListItemsInDto) => {
                await ClientApi.checkListItem.arrangeSortIndex(slug, request);
            },
            onSettled: async () => {
                await queryClient.invalidateQueries({ queryKey: computeQueryKey(slug) })
            },
            onError: async () => {
                await queryClient.invalidateQueries({ queryKey: computeQueryKey(slug) });
            },
        });

        return asrrangeItems;
    }

    interface ToggleArrangeRequest {
        arrangeRequest: RearrangeCheckListItemsInDto;
        updateRequest: BaseCheckListItemOutDto;
    }

    export const useToggleArrangeMutation = (slug: string) => {
        const queryClient = useQueryClient();

        const asrrangeItems = useMutation({
            mutationFn: async (request: ToggleArrangeRequest) => {
                await Promise.all([
                    ClientApi.checkListItem.arrangeSortIndex(slug, request.arrangeRequest),
                    ClientApi.checkListItem.updateCheckListItem(slug, request.updateRequest)
                ]);
            },
            onSettled: async () => {
                await queryClient.invalidateQueries({ queryKey: computeQueryKey(slug) })
            },
            onError: async () => {
                await queryClient.invalidateQueries({ queryKey: computeQueryKey(slug) });
            },
        });

        return asrrangeItems;
    }
}
