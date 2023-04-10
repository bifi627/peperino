/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccessLevel } from './AccessLevel';
import type { BaseOwnableEntity } from './BaseOwnableEntity';
import type { INotification } from './INotification';
import type { UserGroup } from './UserGroup';

export type GroupAccess = {
    id?: number;
    readonly events?: Array<INotification> | null;
    userGroup?: UserGroup;
    accessLevel?: AccessLevel;
    entities?: Array<BaseOwnableEntity> | null;
};
