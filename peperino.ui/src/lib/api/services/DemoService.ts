/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Demo } from '../models/Demo';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DemoService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns Demo Success
     * @throws ApiError
     */
    public getApiDemo(): CancelablePromise<Array<Demo>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/Demo',
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public postApiDemo(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/Demo',
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public deleteApiDemo(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/Demo',
        });
    }

    /**
     * @param id 
     * @returns Demo Success
     * @throws ApiError
     */
    public getApiDemo1(
id: number,
): CancelablePromise<Demo> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/Demo/{id}',
            path: {
                'id': id,
            },
        });
    }

}
