/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccessLevel } from './AccessLevel';

export type SharedLinkInDto = {
    grantAccessLevel: AccessLevel;
    entityType: string;
    slug: string;
};
