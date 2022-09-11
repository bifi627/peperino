/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SessionResponseDto } from '../models/SessionResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AuthService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody 
     * @returns string Success
     * @throws ApiError
     */
    public createSession(
requestBody?: string,
): CancelablePromise<string> {
        return this.httpRequest.request({
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
    public deleteSession(
requestBody?: string,
): CancelablePromise<string> {
        return this.httpRequest.request({
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
    public getSession(
requestBody?: string,
): CancelablePromise<SessionResponseDto> {
        return this.httpRequest.request({
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
    public getTokenInfo(
requestBody?: string,
): CancelablePromise<SessionResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/Auth/info',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
