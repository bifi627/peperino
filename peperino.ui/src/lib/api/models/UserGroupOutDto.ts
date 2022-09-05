/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserOutDto } from './UserOutDto';

export type UserGroupOutDto = {
    groupName: string;
    groupNameSlug: string;
    createdBy: UserOutDto;
};
