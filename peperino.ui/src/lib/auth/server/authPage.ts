import { GetServerSidePropsContext } from "next";
import { AUTH_TOKEN_COOKIE_NAME } from "../../../shared/constants";
import { OpenAPI } from "../../api/core/OpenAPI";
import { AuthService } from "../../api/services/AuthService";
import { KnownRoutes } from "../../routing/knownRoutes";
import { postUserToken } from "../client/firebase";
import { ClaimRequest, verifyClaims } from "../shared/verifyClaims";

export const authPage = async (context: GetServerSidePropsContext, ...claimRequests: ClaimRequest[]) => {
    const sessionCookie = context.req.cookies[AUTH_TOKEN_COOKIE_NAME];

    if (sessionCookie === undefined || sessionCookie === "") {
        console.log("No session cookie!")
        return false;
    }

    try {
        const response = await AuthService.postApiAuthGet(sessionCookie);

        if (!response.idToken || !response.claims) {
            console.log("No idtoken or claims!")
            return false;
        }

        if (verifyClaims(response.claims, ...claimRequests) === true) {
            OpenAPI.TOKEN = response.idToken;
            return true;
        }

    } catch (error) {
        console.error("CRASH");
        console.error(error);
        return false;
    }

    return false;
}

export async function redirectLogin<T>(url: string) {
    await postUserToken();
    return {
        props: {} as T,
        redirect: { destination: KnownRoutes.Login(url) },
    };
}