import { useRouter } from "next/router";
import { KnownRoutes } from "../routing/knownRoutes";
import { GlobalApplicationStateObject } from "../state/ApplicationState";
import { BasePageState } from "../state/BasePageState";

export const useCurrentPageState = (): BasePageState | undefined => {
    const router = useRouter();
    const resolvedRoute = router.asPath
    const patternRoute = router.pathname;

    // First the specific route
    if (patternRoute.startsWith(KnownRoutes.RoomSettings("[slug]"))) {
        return GlobalApplicationStateObject.getRoomSettingsState();
    }
    else if (patternRoute.startsWith(KnownRoutes.Room("[slug]"))) {
        return GlobalApplicationStateObject.getRoomState();
    }
    else if (patternRoute.startsWith(KnownRoutes.Room())) {
        return GlobalApplicationStateObject.getRoomsOverviewState();
    }
    else if (patternRoute.startsWith(KnownRoutes.CheckList("[slug]"))) {
        return GlobalApplicationStateObject.getChecklistState();
    }

    return undefined;
}
