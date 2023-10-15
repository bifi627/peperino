/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CheckListOutDto } from '../models/CheckListOutDto';
import type { CreateCheckListCommand } from '../models/CreateCheckListCommand';
import type { DeleteCheckListCommand } from '../models/DeleteCheckListCommand';
import type { RenameCheckListCommand } from '../models/RenameCheckListCommand';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CheckListService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

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
     * @returns any Success
     * @throws ApiError
     */
    public renameList(
slug: string,
requestBody?: RenameCheckListCommand,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/CheckList/{slug}/rename',
            path: {
                'slug': slug,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
