/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SessionResponseDto } from '../models/SessionResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * @param requestBody 
     * @returns string Success
     * @throws ApiError
     */
    public static createSession(
requestBody?: string,
): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Auth/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns string Success
     * @throws ApiError
     */
    public static deleteSession(
requestBody?: string,
): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Auth/delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns SessionResponseDto Success
     * @throws ApiError
     */
    public static getSession(
requestBody?: string,
): CancelablePromise<SessionResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Auth/get',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns SessionResponseDto Success
     * @throws ApiError
     */
    public static getTokenInfo(
requestBody?: string,
): CancelablePromise<SessionResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Auth/info',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
