/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CheckListItemOutDto } from '../models/CheckListItemOutDto';
import type { CheckListOutDto } from '../models/CheckListOutDto';
import type { CreateCheckListCommand } from '../models/CreateCheckListCommand';
import type { DeleteCheckListCommand } from '../models/DeleteCheckListCommand';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CheckListService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param roomSlug 
     * @returns CheckListOutDto Success
     * @throws ApiError
     */
    public getAllListInRoom(
roomSlug?: string,
): CancelablePromise<Array<CheckListOutDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/CheckList/room',
            query: {
                'roomSlug': roomSlug,
            },
        });
    }

    /**
     * @param listSlug 
     * @returns CheckListOutDto Success
     * @throws ApiError
     */
    public getCheckListBySlug(
listSlug: string,
): CancelablePromise<CheckListOutDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/CheckList',
            query: {
                'listSlug': listSlug,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns CheckListOutDto Success
     * @throws ApiError
     */
    public createList(
requestBody?: CreateCheckListCommand,
): CancelablePromise<CheckListOutDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/CheckList',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public deleteList(
requestBody?: DeleteCheckListCommand,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/CheckList',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param slug 
     * @param requestBody 
     * @returns CheckListItemOutDto Success
     * @throws ApiError
     */
    public addCheckListItem(
slug: string,
requestBody: string,
): CancelablePromise<CheckListItemOutDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/CheckList/{slug}/add',
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
            url: '/api/CheckList/{slug}/{id}',
            path: {
                'slug': slug,
                'id': id,
            },
        });
    }

    /**
     * @param slug 
     * @param id 
     * @param requestBody 
     * @returns CheckListItemOutDto Success
     * @throws ApiError
     */
    public updateCheckListItem(
slug: string,
id: number,
requestBody?: CheckListItemOutDto,
): CancelablePromise<CheckListItemOutDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/CheckList/{slug}/{id}',
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
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public arrangeSortIndex(
slug?: string,
requestBody?: Array<CheckListItemOutDto>,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/CheckList/arrange',
            query: {
                'slug': slug,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
