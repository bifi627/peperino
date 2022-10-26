/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseCheckListItemOutDto } from './BaseCheckListItemOutDto';
import type { ItemType } from './ItemType';

export type LinkCheckListItemOutDto = (BaseCheckListItemOutDto & {
id: number;
sortIndex: number;
checked: boolean;
itemType: ItemType;
link: string;
});
