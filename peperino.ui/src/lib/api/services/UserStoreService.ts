/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserStoreDto } from '../models/UserStoreDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserStoreService {

    /**
     * @returns UserStoreDto Success
     * @throws ApiError
     */
    public static getApiUserStore(): CancelablePromise<UserStoreDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/UserStore',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiUserStore(
requestBody?: UserStoreDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/UserStore',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
