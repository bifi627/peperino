/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseEvent } from './BaseEvent';

export type User = {
    id?: number;
    readonly domainEvents?: Array<BaseEvent> | null;
    externalId?: string | null;
    userName?: string | null;
};
