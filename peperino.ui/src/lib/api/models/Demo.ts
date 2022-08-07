/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseEvent } from './BaseEvent';
import type { User } from './User';

export type Demo = {
    id?: number;
    readonly domainEvents?: Array<BaseEvent> | null;
    created?: string;
    createdBy?: User;
    lastModified?: string | null;
    lastModifiedBy?: User;
    value?: string | null;
};
