/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { AuthService } from './services/AuthService';
import { DemoService } from './services/DemoService';
import { HealthCheckService } from './services/HealthCheckService';
import { RoomService } from './services/RoomService';
import { SharedLinkService } from './services/SharedLinkService';
import { UserService } from './services/UserService';
import { UserStoreService } from './services/UserStoreService';
import { WeatherForecastService } from './services/WeatherForecastService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class PeperinoApiClient {

    public readonly auth: AuthService;
    public readonly demo: DemoService;
    public readonly healthCheck: HealthCheckService;
    public readonly room: RoomService;
    public readonly sharedLink: SharedLinkService;
    public readonly user: UserService;
    public readonly userStore: UserStoreService;
    public readonly weatherForecast: WeatherForecastService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '1.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.auth = new AuthService(this.request);
        this.demo = new DemoService(this.request);
        this.healthCheck = new HealthCheckService(this.request);
        this.room = new RoomService(this.request);
        this.sharedLink = new SharedLinkService(this.request);
        this.user = new UserService(this.request);
        this.userStore = new UserStoreService(this.request);
        this.weatherForecast = new WeatherForecastService(this.request);
    }
}
