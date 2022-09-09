/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SharedLinkInDto } from '../models/SharedLinkInDto';
import type { SharedLinkOutDto } from '../models/SharedLinkOutDto';
import type { SharedLinkResolvedOutDto } from '../models/SharedLinkResolvedOutDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SharedLinkService {

    /**
     * @param requestBody 
     * @returns SharedLinkOutDto Success
     * @throws ApiError
     */
    public static createSharedLink(
requestBody?: SharedLinkInDto,
): CancelablePromise<SharedLinkOutDto> {
        return __request(OpenAPI, {
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
    public static executeSharedLink(
slug: string,
): CancelablePromise<SharedLinkResolvedOutDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/SharedLink/{slug}',
            path: {
                'slug': slug,
            },
        });
    }

}
