/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SharedLinkInDto } from '../models/SharedLinkInDto';
import type { SharedLinkOutDto } from '../models/SharedLinkOutDto';
import type { SharedLinkResolvedOutDto } from '../models/SharedLinkResolvedOutDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SharedLinkService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody 
     * @returns SharedLinkOutDto Success
     * @throws ApiError
     */
    public createSharedLink(
requestBody?: SharedLinkInDto,
): CancelablePromise<SharedLinkOutDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/SharedLink',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param slug 
     * @returns SharedLinkResolvedOutDto Success
     * @throws ApiError
     */
    public executeSharedLink(
slug: string,
): CancelablePromise<SharedLinkResolvedOutDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/SharedLink/{slug}',
            path: {
                'slug': slug,
            },
        });
    }

}
