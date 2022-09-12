import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { AUTH_TOKEN_COOKIE_NAME } from "../../../shared/constants";
import { PeperinoApiClient } from "../../api";
import { KnownRoutes } from "../../routing/knownRoutes";
import { manageSessionForUser } from "../client/firebase";
import { getApiConfig } from "../shared/getApiConfig";
import { ClaimRequest, verifyClaims } from "../shared/verifyClaims";

type AuthFlowState = "NONE" | "CRASH" | "DENIED" | "EXPIRED" | "VALID";

interface AuthPageResult {
    idToken?: string;
    sessionToken?: string;
    state: AuthFlowState;
}

export const authPage = async (context: GetServerSidePropsContext, ...claimRequests: ClaimRequest[]): Promise<AuthPageResult> => {
    const sessionToken = context.req.cookies[AUTH_TOKEN_COOKIE_NAME];

    if (sessionToken === undefined || sessionToken === "") {
        console.log("No session cookie!")
        return { state: "NONE" };
    }

    try {
        const api = new PeperinoApiClient(getApiConfig());
        const response = await api.auth.getSession(sessionToken);

        if (response.expired) {
            console.warn("token expired, try sso next");
            return { state: "EXPIRED", idToken: response.idToken, sessionToken: sessionToken };
        }

        if (!response.idToken || !response.claims) {
            console.warn("No idtoken or claims!")
            return { state: "NONE" };
        }

        if (verifyClaims(response.claims, ...claimRequests) === true) {
            return { state: "VALID", idToken: response.idToken, sessionToken: sessionToken };
        }
        else {
            return { state: "DENIED", idToken: response.idToken, sessionToken: sessionToken };
        }

    } catch (error) {
        console.error("CRASH");
        console.error(error);
        return { state: "NONE" };
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

export interface AuthSuccessResult extends AuthPageResult {
    api: PeperinoApiClient;
}

export async function withAuth<T>(context: GetServerSidePropsContext, claimRequests: ClaimRequest[], successCallback: (authResult: AuthSuccessResult) => Promise<GetServerSidePropsResult<T>>): Promise<GetServerSidePropsResult<T>> {
    const url = context.resolvedUrl;
    console.log(url);
    const authResult = await authPage(context, ...claimRequests);

    // Everything ok...
    if (authResult.state === "VALID") {
        const authSuccessResult: AuthSuccessResult = { ...authResult, api: new PeperinoApiClient(getApiConfig(authResult.idToken)) };
        const result = await successCallback(authSuccessResult);
        return result;
    }

    // Auth Token probably expired
    if (authResult.state === "EXPIRED") {
        return redirectSSO(url);
    }

    return redirectLogin(url);
}