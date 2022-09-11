/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WeatherForecast } from '../models/WeatherForecast';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class WeatherForecastService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns WeatherForecast Success
     * @throws ApiError
     */
    public getWeatherForecast(): CancelablePromise<Array<WeatherForecast>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/WeatherForecast',
        });
    }

    /**
     * @returns WeatherForecast Success
     * @throws ApiError
     */
    public getWeatherForecastAuth(): CancelablePromise<Array<WeatherForecast>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/WeatherForecast/auth',
        });
    }

}
