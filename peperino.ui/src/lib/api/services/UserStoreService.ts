/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserStoreDto } from '../models/UserStoreDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UserStoreService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns UserStoreDto Success
     * @throws ApiError
     */
    public getApiUserStore(): CancelablePromise<UserStoreDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/UserStore',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public postApiUserStore(
requestBody?: UserStoreDto,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/UserStore',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
