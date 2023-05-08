/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateInventoryCommand } from '../models/CreateInventoryCommand';
import type { DeleteInventoryCommand } from '../models/DeleteInventoryCommand';
import type { InventoryOutDto } from '../models/InventoryOutDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class InventoryService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param inventorySlug 
     * @returns InventoryOutDto Success
     * @throws ApiError
     */
    public getInventoryBySlug(
inventorySlug: string,
): CancelablePromise<InventoryOutDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/Inventory',
            query: {
                'inventorySlug': inventorySlug,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns InventoryOutDto Success
     * @throws ApiError
     */
    public createInventory(
requestBody?: CreateInventoryCommand,
): CancelablePromise<InventoryOutDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/Inventory',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public deleteInventory(
requestBody?: DeleteInventoryCommand,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/Inventory',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
