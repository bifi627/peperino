/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseCheckListItemOutDto } from './BaseCheckListItemOutDto';
import type { CheckListItemTypeOutDto } from './CheckListItemTypeOutDto';
import type { QuantityUnit } from './QuantityUnit';

export type InventoryCheckListItemOutDto = (BaseCheckListItemOutDto & {
id: number;
sortIndex: number;
checked: boolean;
itemType: CheckListItemTypeOutDto;
text: string;
quantity: number;
unit: QuantityUnit;
});
