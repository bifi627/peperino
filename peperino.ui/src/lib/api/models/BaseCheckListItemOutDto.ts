/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ItemType } from './ItemType';

export type BaseCheckListItemOutDto = {
    itemType: ItemType;
    id: number;
    sortIndex: number;
    checked: boolean;
    $type: string | null;
};
