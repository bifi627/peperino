/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { QuantityUnit } from './QuantityUnit';

export type AddInventoryItemCommand = {
    inventorySlug: string;
    text: string;
    quantity: number;
    unit: QuantityUnit;
};
