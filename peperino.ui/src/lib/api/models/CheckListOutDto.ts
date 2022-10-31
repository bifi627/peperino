/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseCheckListItemOutDto } from './BaseCheckListItemOutDto';
import type { RoomOutDto } from './RoomOutDto';

export type CheckListOutDto = {
    id: number;
    room: RoomOutDto;
    name: string;
    slug: string;
    entities: Array<BaseCheckListItemOutDto>;
};
