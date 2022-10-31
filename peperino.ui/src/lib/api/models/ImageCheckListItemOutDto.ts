/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseCheckListItemOutDto } from './BaseCheckListItemOutDto';
import type { CheckListItemTypeOutDto } from './CheckListItemTypeOutDto';

export type ImageCheckListItemOutDto = (BaseCheckListItemOutDto & {
id: number;
sortIndex: number;
checked: boolean;
itemType: CheckListItemTypeOutDto;
title: string;
imageReference: string;
});
