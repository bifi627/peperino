/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InventoryCheckListItemOutDto } from './InventoryCheckListItemOutDto';
import type { RoomOutDto } from './RoomOutDto';

export type InventoryOutDto = {
    id: number;
    room: RoomOutDto;
    name: string;
    slug: string;
    entities: Array<InventoryCheckListItemOutDto>;
};
