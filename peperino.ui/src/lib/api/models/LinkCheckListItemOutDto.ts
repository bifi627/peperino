/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseCheckListItemOutDto } from './BaseCheckListItemOutDto';
import type { CheckListItemTypeOutDto } from './CheckListItemTypeOutDto';

export type LinkCheckListItemOutDto = (BaseCheckListItemOutDto & {
id: number;
sortIndex: number;
checked: boolean;
itemType: CheckListItemTypeOutDto;
link: string;
});
