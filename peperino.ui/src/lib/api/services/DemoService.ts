/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Demo } from '../models/Demo';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DemoService {

    /**
     * @returns Demo Success
     * @throws ApiError
     */
    public static getApiDemo(): CancelablePromise<Array<Demo>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Demo',
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static postApiDemo(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Demo',
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static deleteApiDemo(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Demo',
        });
    }

    /**
     * @param id 
     * @returns Demo Success
     * @throws ApiError
     */
    public static getApiDemo1(
id: number,
): CancelablePromise<Demo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Demo/{id}',
            path: {
                'id': id,
            },
        });
    }

}
