/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccessLevel } from './AccessLevel';
import type { UserOutDto } from './UserOutDto';

export type RoomOutDto = {
    roomName: string;
    slug: string;
    createdBy: UserOutDto;
    accessLevel: AccessLevel;
};
