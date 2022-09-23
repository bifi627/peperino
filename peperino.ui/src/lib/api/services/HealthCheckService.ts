/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class HealthCheckService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns number Success
     * @throws ApiError
     */
    public getApiHealthCheck(): CancelablePromise<number> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/HealthCheck',
        });
    }

}
