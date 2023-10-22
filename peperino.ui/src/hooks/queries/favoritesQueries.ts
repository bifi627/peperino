import { useQuery } from "@tanstack/react-query";
import { ClientApi } from "../../lib/auth/client/apiClient";

export module FavoritesQueries {
    export const favoriteCheckListsQuery = ["getFavoriteCheckListsQuery"]
    export const favoriteInventoriesQuery = ["getFavoriteInventoriesQuery"]

    export const useGetFavoriteCheckListsQuery = () => {
        return useQuery({
            queryKey: favoriteCheckListsQuery,
            queryFn: async () => {
                return await ClientApi.favorites.getFavoriteCheckLists();
            }
        });
    }

    export const useGetFavoriteInventoryQuery = () => {
        return useQuery({
            queryKey: favoriteCheckListsQuery,
            queryFn: async () => {
                return await ClientApi.favorites.getFavoriteInventories();
            }
        });
    }
}