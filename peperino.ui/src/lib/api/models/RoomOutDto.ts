/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccessLevel } from './AccessLevel';
import type { CheckListOutDto } from './CheckListOutDto';
import type { UserOutDto } from './UserOutDto';

export type RoomOutDto = {
    id: number;
    roomName: string;
    slug: string;
    createdBy: UserOutDto;
    accessLevel: AccessLevel;
    checkLists: Array<CheckListOutDto>;
};
