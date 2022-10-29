/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ImageStoreService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns any Success
     * @throws ApiError
     */
    public getTicket(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/ImageStore',
        });
    }

    /**
     * @param contextId 
     * @param guid 
     * @returns any Success
     * @throws ApiError
     */
    public get(
contextId: number,
guid: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/ImageStore/{contextId}/{guid}',
            path: {
                'contextId': contextId,
                'guid': guid,
            },
        });
    }

}
