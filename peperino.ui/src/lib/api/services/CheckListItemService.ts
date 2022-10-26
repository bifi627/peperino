/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseCheckListItemOutDto } from '../models/BaseCheckListItemOutDto';
import type { RearrangeCheckListItemsInDto } from '../models/RearrangeCheckListItemsInDto';
import type { StringUpdateCheckListItemAction } from '../models/StringUpdateCheckListItemAction';

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
    public addCheckListItem(
slug: string,
requestBody: StringUpdateCheckListItemAction,
): CancelablePromise<BaseCheckListItemOutDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/CheckListItem/{slug}/string/add',
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
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public updateCheckListItem(
slug: string,
id: number,
requestBody: StringUpdateCheckListItemAction,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/CheckListItem/{slug}/{id}/string/update',
            path: {
                'slug': slug,
                'id': id,
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
