/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseCheckListItemOutDto } from '../models/BaseCheckListItemOutDto';
import type { ImageCheckListItemInDto } from '../models/ImageCheckListItemInDto';
import type { InventoryCheckListItemInDto } from '../models/InventoryCheckListItemInDto';
import type { LinkCheckListItemInDto } from '../models/LinkCheckListItemInDto';
import type { RearrangeCheckListItemsInDto } from '../models/RearrangeCheckListItemsInDto';
import type { TextCheckListItemInDto } from '../models/TextCheckListItemInDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CheckListItemService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param slug 
     * @param requestBody 
     * @returns BaseCheckListItemOutDto Success
     * @throws ApiError
     */
    public addTextItem(
slug: string,
requestBody: TextCheckListItemInDto,
): CancelablePromise<BaseCheckListItemOutDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/CheckListItem/{slug}/text/add',
            path: {
                'slug': slug,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param slug 
     * @param requestBody 
     * @returns BaseCheckListItemOutDto Success
     * @throws ApiError
     */
    public addLinkItem(
slug: string,
requestBody: LinkCheckListItemInDto,
): CancelablePromise<BaseCheckListItemOutDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/CheckListItem/{slug}/link/add',
            path: {
                'slug': slug,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param slug 
     * @param requestBody 
     * @returns BaseCheckListItemOutDto Success
     * @throws ApiError
     */
    public addImageItem(
slug: string,
requestBody: ImageCheckListItemInDto,
): CancelablePromise<BaseCheckListItemOutDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/CheckListItem/{slug}/image/add',
            path: {
                'slug': slug,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param slug 
     * @param requestBody 
     * @returns BaseCheckListItemOutDto Success
     * @throws ApiError
     */
    public addInventoryItem(
slug: string,
requestBody: InventoryCheckListItemInDto,
): CancelablePromise<BaseCheckListItemOutDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/CheckListItem/{slug}/inventory/add',
            path: {
                'slug': slug,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param slug 
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public updateCheckListItem(
slug: string,
requestBody: BaseCheckListItemOutDto,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/CheckListItem/{slug}/updateItem',
            path: {
                'slug': slug,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param slug 
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public deleteCheckListItem(
slug: string,
id: number,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/CheckListItem/{slug}/{id}',
            path: {
                'slug': slug,
                'id': id,
            },
        });
    }

    /**
     * @param slug 
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public toggleCheck(
slug: string,
id: number,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/CheckListItem/{slug}/{id}/base/check',
            path: {
                'slug': slug,
                'id': id,
            },
        });
    }

    /**
     * @param slug 
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public arrangeSortIndex(
slug: string,
requestBody?: RearrangeCheckListItemsInDto,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/CheckListItem/{slug}/base/arrange',
            path: {
                'slug': slug,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
