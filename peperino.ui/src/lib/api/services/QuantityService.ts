/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InventoryQuantityTypeOutDto } from '../models/InventoryQuantityTypeOutDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class QuantityService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns InventoryQuantityTypeOutDto Success
     * @throws ApiError
     */
    public getAllQuantities(): CancelablePromise<Array<InventoryQuantityTypeOutDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/Quantity',
        });
    }

}
