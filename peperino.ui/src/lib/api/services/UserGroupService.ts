/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserGroupInDto } from '../models/UserGroupInDto';
import type { UserGroupOutDto } from '../models/UserGroupOutDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserGroupService {

    /**
     * @param requestBody 
     * @returns UserGroupOutDto Success
     * @throws ApiError
     */
    public static create(
requestBody?: UserGroupInDto,
): CancelablePromise<UserGroupOutDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/UserGroup',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns UserGroupOutDto Success
     * @throws ApiError
     */
    public static getAll(): CancelablePromise<Array<UserGroupOutDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/UserGroup',
        });
    }

    /**
     * @param slug 
     * @returns UserGroupOutDto Success
     * @throws ApiError
     */
    public static getBySlug(
slug: string,
): CancelablePromise<UserGroupOutDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/UserGroup/{slug}',
            path: {
                'slug': slug,
            },
        });
    }

    /**
     * @param slug 
     * @returns any Success
     * @throws ApiError
     */
    public static deleteBySlug(
slug: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/UserGroup/{slug}',
            path: {
                'slug': slug,
            },
        });
    }

}
