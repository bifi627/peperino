/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseEvent } from './BaseEvent';
import type { UserGroup } from './UserGroup';

export type User = {
    id?: string | null;
    readonly domainEvents?: Array<BaseEvent> | null;
    userName?: string | null;
    userGroups?: Array<UserGroup> | null;
};
