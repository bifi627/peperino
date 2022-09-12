/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CheckListOutDto } from '../models/CheckListOutDto';
import type { CreateCheckListCommand } from '../models/CreateCheckListCommand';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CheckListService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody 
     * @returns CheckListOutDto Success
     * @throws ApiError
     */
    public postApiCheckList(
requestBody?: CreateCheckListCommand,
): CancelablePromise<CheckListOutDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/CheckList',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
