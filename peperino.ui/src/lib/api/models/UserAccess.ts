/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccessLevel } from './AccessLevel';
import type { BaseOwnableEntity } from './BaseOwnableEntity';
import type { INotification } from './INotification';
import type { User } from './User';

export type UserAccess = {
    id?: number;
    readonly events?: Array<INotification> | null;
    user?: User;
    accessLevel?: AccessLevel;
    entities?: Array<BaseOwnableEntity> | null;
};
