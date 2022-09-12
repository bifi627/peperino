/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SessionResponseDto = {
    idToken: string;
    userName: string;
    expired: boolean;
    claims: Record<string, any>;
};
