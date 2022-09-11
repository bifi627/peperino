import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { AUTH_TOKEN_COOKIE_NAME } from "../../../shared/constants";
import { OpenAPI } from "../../api/core/OpenAPI";
import { AuthService } from "../../api/services/AuthService";
import { KnownRoutes } from "../../routing/knownRoutes";
import { manageSessionForUser } from "../client/firebase";
import { ClaimRequest, verifyClaims } from "../shared/verifyClaims";

type AuthFlowState = "NONE" | "CRASH" | "DENIED" | "EXPIRED" | "VALID";

export const authPage = async (context: GetServerSidePropsContext, ...claimRequests: ClaimRequest[]): Promise<AuthFlowState> => {
    const authToken = context.req.cookies[AUTH_TOKEN_COOKIE_NAME];

    if (authToken === undefined || authToken === "") {
        console.log("No session cookie!")
        return "NONE";
    }

    try {

        console.log(authToken.substring(authToken.length - 5));
        const response = await AuthService.getTokenInfo(authToken);

        if (response.expired) {
            console.warn("token expired, try sso next");
            return "EXPIRED";
        }

        if (!response.idToken || !response.claims) {
            console.warn("No idtoken or claims!")
            return "NONE";
        }

        if (verifyClaims(response.claims, ...claimRequests) === true) {
            OpenAPI.TOKEN = response.idToken;
            return "VALID"
        }
        else {
            return "DENIED";
        }

    } catch (error) {
        console.error("CRASH");
        console.error(error);
        return "CRASH";
    }
}

export async function redirectLogin<T>(url: string): Promise<GetServerSidePropsResult<T>> {
    await manageSessionForUser();

    const result = {
        props: {} as T,
        redirect: { destination: KnownRoutes.Login(url) },
    } as GetServerSidePropsResult<T>;

    return result;
}

export async function redirectSSO<T>(url: string): Promise<GetServerSidePropsResult<T>> {
    await manageSessionForUser();

    const result = {
        props: {} as T,
        redirect: { destination: KnownRoutes.SSO(url) },
    } as GetServerSidePropsResult<T>;

    return result;
}

export async function handleSSRAuthPage<T>(context: GetServerSidePropsContext, claimRequests: ClaimRequest[], successCallback: () => Promise<GetServerSidePropsResult<T>>): Promise<GetServerSidePropsResult<T>> {
    const url = context.resolvedUrl;
    console.log(url);
    const authState = await authPage(context, ...claimRequests);

    console.log(authState);

    // Everything ok...
    if (authState === "VALID") {
        const result = await successCallback();
        return result;
    }

    // Auth Token probably expired
    if (authState === "EXPIRED") {
        return redirectSSO(url);
    }

    return redirectLogin(url);
}