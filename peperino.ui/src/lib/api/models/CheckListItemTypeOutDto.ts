/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ItemVariant } from './ItemVariant';

export type CheckListItemTypeOutDto = {
    name?: string | null;
    description?: string | null;
    variant: ItemVariant;
};
