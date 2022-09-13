/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccessLevel } from './AccessLevel';
import type { BaseEvent } from './BaseEvent';
import type { BaseOwnableEntity } from './BaseOwnableEntity';
import type { User } from './User';

export type UserAccess = {
    id?: number;
    readonly domainEvents?: Array<BaseEvent> | null;
    user?: User;
    accessLevel?: AccessLevel;
    entities?: Array<BaseOwnableEntity> | null;
};
