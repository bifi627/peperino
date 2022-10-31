/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CheckListItemTypeOutDto } from './CheckListItemTypeOutDto';

export type BaseCheckListItemOutDto = {
    id: number;
    sortIndex: number;
    checked: boolean;
    itemType: CheckListItemTypeOutDto;
    $type: string | null;
};
