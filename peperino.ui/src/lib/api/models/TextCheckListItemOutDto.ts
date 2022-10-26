/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseCheckListItemOutDto } from './BaseCheckListItemOutDto';
import type { ItemType } from './ItemType';

export type TextCheckListItemOutDto = (BaseCheckListItemOutDto & {
id: number;
sortIndex: number;
checked: boolean;
itemType: ItemType;
text: string;
});
