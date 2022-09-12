/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CheckListItemOutDto } from './CheckListItemOutDto';
import type { RoomOutDto } from './RoomOutDto';

export type CheckListOutDto = {
    room: RoomOutDto;
    name: string;
    slug: string;
    entities: Array<CheckListItemOutDto>;
};
