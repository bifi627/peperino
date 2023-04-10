/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { INotification } from './INotification';
import type { UserGroup } from './UserGroup';

export type User = {
    id?: string | null;
    readonly events?: Array<INotification> | null;
    userName?: string | null;
    userGroups?: Array<UserGroup> | null;
};
