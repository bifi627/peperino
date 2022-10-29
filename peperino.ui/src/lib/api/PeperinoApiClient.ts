/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { CheckListService } from './services/CheckListService';
import { CheckListItemService } from './services/CheckListItemService';
import { DemoService } from './services/DemoService';
import { EnvironmentService } from './services/EnvironmentService';
import { HealthCheckService } from './services/HealthCheckService';
import { ImageStoreService } from './services/ImageStoreService';
import { RoomService } from './services/RoomService';
import { SharedLinkService } from './services/SharedLinkService';
import { UserService } from './services/UserService';
import { UserStoreService } from './services/UserStoreService';
import { WeatherForecastService } from './services/WeatherForecastService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class PeperinoApiClient {

    public readonly checkList: CheckListService;
    public readonly checkListItem: CheckListItemService;
    public readonly demo: DemoService;
    public readonly environment: EnvironmentService;
    public readonly healthCheck: HealthCheckService;
    public readonly imageStore: ImageStoreService;
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

        this.checkList = new CheckListService(this.request);
        this.checkListItem = new CheckListItemService(this.request);
        this.demo = new DemoService(this.request);
        this.environment = new EnvironmentService(this.request);
        this.healthCheck = new HealthCheckService(this.request);
        this.imageStore = new ImageStoreService(this.request);
        this.room = new RoomService(this.request);
        this.sharedLink = new SharedLinkService(this.request);
        this.user = new UserService(this.request);
        this.userStore = new UserStoreService(this.request);
        this.weatherForecast = new WeatherForecastService(this.request);
    }
}
