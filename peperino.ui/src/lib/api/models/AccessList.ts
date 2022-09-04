/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseEvent } from './BaseEvent';
import type { GroupAccess } from './GroupAccess';
import type { UserAccess } from './UserAccess';

export type AccessList = {
    id?: number;
    readonly domainEvents?: Array<BaseEvent> | null;
    parentRelation?: number | null;
    userAccess?: Array<UserAccess> | null;
    groupAccess?: Array<GroupAccess> | null;
};
