/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GroupAccess } from './GroupAccess';
import type { INotification } from './INotification';
import type { User } from './User';
import type { UserAccess } from './UserAccess';

export type Demo = {
    id?: number;
    readonly events?: Array<INotification> | null;
    created?: string;
    createdBy?: User;
    lastModified?: string | null;
    lastModifiedBy?: User;
    userAccess?: Array<UserAccess> | null;
    groupAccess?: Array<GroupAccess> | null;
    value?: string | null;
};
