/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccessLevel } from './AccessLevel';
import type { BaseEvent } from './BaseEvent';
import type { BaseOwnableEntity } from './BaseOwnableEntity';
import type { UserGroup } from './UserGroup';

export type GroupAccess = {
    id?: number;
    readonly domainEvents?: Array<BaseEvent> | null;
    userGroup?: UserGroup;
    accessLevel?: AccessLevel;
    entities?: Array<BaseOwnableEntity> | null;
};
