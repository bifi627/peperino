/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRoomCommand } from '../models/CreateRoomCommand';
import type { RoomOutDto } from '../models/RoomOutDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RoomService {

    /**
     * @param requestBody 
     * @returns RoomOutDto Success
     * @throws ApiError
     */
    public static createRoom(
requestBody?: CreateRoomCommand,
): CancelablePromise<RoomOutDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Room',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns RoomOutDto Success
     * @throws ApiError
     */
    public static getAll(): CancelablePromise<Array<RoomOutDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Room',
        });
    }

    /**
     * @param slug 
     * @returns RoomOutDto Success
     * @throws ApiError
     */
    public static getBySlug(
slug: string,
): CancelablePromise<RoomOutDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Room/{slug}',
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
            url: '/api/Room/{slug}',
            path: {
                'slug': slug,
            },
        });
    }

}
