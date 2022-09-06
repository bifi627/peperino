import { User } from "@firebase/auth";
import { AnonymousAppFrameConifg, DefaultAppFrameConifg } from "../../pages";
import { KnownRoutes } from "../routing/knownRoutes";
import { GlobalApplicationStateObject } from "../state/ApplicationState";
import { AppFrameConfig } from "./AppFrameConfig";

export const getAppFrameConfig = (user: User | null | undefined, resolvedRoute: string, patternRoute: string) => {
    const initial = user ? DefaultAppFrameConifg(user) : AnonymousAppFrameConifg;
    const specialConfigs: AppFrameConfig[] = [];

    if (resolvedRoute.startsWith(KnownRoutes.Demo())) {
        const demoPageConfig = GlobalApplicationStateObject.getDemoState().appFrameConfig;
        if (demoPageConfig) {
            specialConfigs.push(demoPageConfig);
        }
    }

    // First the specific route
    if (patternRoute.startsWith(KnownRoutes.RoomSettings("[slug]"))) {
        const groupSettingsPageConifg = GlobalApplicationStateObject.getRoomSettingsState().appFrameConfig;
        if (groupSettingsPageConifg) {
            specialConfigs.push(groupSettingsPageConifg);
        }
    }
    else if (patternRoute.startsWith(KnownRoutes.Room("[slug]"))) {
        const groupPageConfig = GlobalApplicationStateObject.getRoomState().appFrameConfig;
        if (groupPageConfig) {
            specialConfigs.push(groupPageConfig);
        }
    }
    else if (patternRoute.startsWith(KnownRoutes.Room())) {
        const groupsPageConfig = GlobalApplicationStateObject.getRoomsOverviewState().appFrameConfig;
        if (groupsPageConfig) {
            specialConfigs.push(groupsPageConfig);
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