/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserInDto } from '../models/UserInDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * @param requestBody 
     * @returns number Success
     * @throws ApiError
     */
    public static postApiUser(
requestBody?: UserInDto,
): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/User',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
