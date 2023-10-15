/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRoomCommand } from '../models/CreateRoomCommand';
import type { RenameRoomCommand } from '../models/RenameRoomCommand';
import type { RevokeRoomAccessCommand } from '../models/RevokeRoomAccessCommand';
import type { RoomOutDto } from '../models/RoomOutDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class RoomService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody 
     * @returns RoomOutDto Success
     * @throws ApiError
     */
    public createRoom(
requestBody?: CreateRoomCommand,
): CancelablePromise<RoomOutDto> {
        return this.httpRequest.request({
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
    public getAll(): CancelablePromise<Array<RoomOutDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/Room',
        });
    }

    /**
     * @param slug 
     * @returns RoomOutDto Success
     * @throws ApiError
     */
    public getBySlug(
slug: string,
): CancelablePromise<RoomOutDto> {
        return this.httpRequest.request({
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
    public deleteBySlug(
slug: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/Room/{slug}',
            path: {
                'slug': slug,
            },
        });
    }

    /**
     * @param slug 
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public renameRoom(
slug: string,
requestBody?: RenameRoomCommand,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/Room/{slug}/rename',
            path: {
                'slug': slug,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param slug 
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public revokeUserAccess(
slug: string,
requestBody?: RevokeRoomAccessCommand,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/Room/{slug}/revoke',
            path: {
                'slug': slug,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
