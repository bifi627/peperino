/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EnvironmentOutDto } from '../models/EnvironmentOutDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class EnvironmentService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns EnvironmentOutDto Success
     * @throws ApiError
     */
    public getEnvironment(): CancelablePromise<EnvironmentOutDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/Environment',
        });
    }

}
