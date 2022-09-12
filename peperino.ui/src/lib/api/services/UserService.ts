/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserInDto } from '../models/UserInDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UserService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody 
     * @returns number Success
     * @throws ApiError
     */
    public postApiUser(
requestBody?: UserInDto,
): CancelablePromise<number> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/User',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
