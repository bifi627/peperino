import { User } from "@firebase/auth";
import { AnonymousAppFrameConifg, DefaultAppFrameConifg } from "../../pages";
import { KnownRoutes } from "../routing/knownRoutes";
import { GlobalApplicationStateObject } from "../state/ApplicationState";
import { AppFrameConfig } from "./AppFrameConfig";

export const getAppFrameConfig = (user: User | null | undefined, route: string) => {
    const initial = user ? DefaultAppFrameConifg(user) : AnonymousAppFrameConifg;
    const specialConfigs: AppFrameConfig[] = [];

    if (route.startsWith(KnownRoutes.Demo())) {
        const demoPageConfig = GlobalApplicationStateObject.getDemoState().appFrameConfig;
        if (demoPageConfig) {
            specialConfigs.push(demoPageConfig);
        }
    }

    if (specialConfigs.length > 0) {
        let mergedConfig = initial;
        for (const config of specialConfigs) {
            if (config.overwrite) {
                return config;
            }

            mergedConfig = { ...mergedConfig, ...config };
        }

        return mergedConfig;
    }

    return user ? DefaultAppFrameConifg(user) : AnonymousAppFrameConifg;
}