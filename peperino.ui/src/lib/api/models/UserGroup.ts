/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { INotification } from './INotification';
import type { User } from './User';

export type UserGroup = {
    id?: number;
    readonly events?: Array<INotification> | null;
    created?: string;
    createdBy?: User;
    lastModified?: string | null;
    lastModifiedBy?: User;
    groupName?: string | null;
    users?: Array<User> | null;
};
