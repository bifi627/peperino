/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseEvent } from './BaseEvent';
import type { GroupAccess } from './GroupAccess';
import type { User } from './User';
import type { UserAccess } from './UserAccess';

export type BaseOwnableEntity = {
    id?: number;
    readonly domainEvents?: Array<BaseEvent> | null;
    created?: string;
    createdBy?: User;
    lastModified?: string | null;
    lastModifiedBy?: User;
    userAccess?: Array<UserAccess> | null;
    groupAccess?: Array<GroupAccess> | null;
};
