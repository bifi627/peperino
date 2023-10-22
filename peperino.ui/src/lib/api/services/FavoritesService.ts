/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CheckListOutDto } from '../models/CheckListOutDto';
import type { UpdateFavoritesCommand } from '../models/UpdateFavoritesCommand';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FavoritesService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param slug 
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public updateFavoriteCheckList(
slug: string,
requestBody?: UpdateFavoritesCommand,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/Favorites/checklist/{slug}',
            path: {
                'slug': slug,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns CheckListOutDto Success
     * @throws ApiError
     */
    public getFavoriteCheckLists(): CancelablePromise<Array<CheckListOutDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/Favorites/checklist',
        });
    }

    /**
     * @returns CheckListOutDto Success
     * @throws ApiError
     */
    public getFavoriteInventories(): CancelablePromise<Array<CheckListOutDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/Favorites/inventory',
        });
    }

}
