import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { CreateCheckListCommand } from "../../lib/api";
import { ClientApi } from "../../lib/auth/client/apiClient";

export module RoomQueries {
    export const roomQueryKey = ["getAllRoomsQuery"];

    export const useGetAllRoomsQuery = () => {
        return useQuery({ queryKey: roomQueryKey, queryFn: ClientApi.room.getAll.bind(ClientApi.room) });
    }

    export const useCreateRoomMutation = (queryClient: QueryClient, onMutate?: () => unknown | Promise<unknown>) => {
        const createRoomMutation = useMutation({
            mutationFn: async (roomName: string) => {
                await ClientApi.room.createRoom({ roomName: roomName });
            },
            onSettled: async () => {
                await queryClient.invalidateQueries({ queryKey: roomQueryKey });
            },
            onMutate: onMutate,
        });
        return createRoomMutation;
    }

    export const roomBySlugQueryKey = ["getRoomBySlugQuery"]
    export const useGetRoomBySlugQuery = (slug: string) => {
        return useQuery({
            queryKey: roomBySlugQueryKey,
            queryFn: () => {
                return ClientApi.room.getBySlug(slug);
            }
        })
    }

    export const useCreateCheckListMutation = (queryClient: QueryClient, onMutate?: () => unknown | Promise<unknown>) => {
        const createRoomMutation = useMutation({
            mutationFn: async (createCommand: CreateCheckListCommand) => {
                await ClientApi.checkList.createList(createCommand);
            },
            onSettled: async () => {
                await queryClient.invalidateQueries({ queryKey: roomBySlugQueryKey });
            },
            onMutate: onMutate,
        });
        return createRoomMutation;
    }
}

