import { GetServerSidePropsContext } from "next";
import { AUTH_TOKEN_COOKIE_NAME } from "../../../shared/constants";
import { OpenAPI } from "../../api/core/OpenAPI";
import { AuthService } from "../../api/services/AuthService";
import { ClaimRequest, verifyClaims } from "../shared/verifyClaims";

export const authPage = async (context: GetServerSidePropsContext, ...claimRequests: ClaimRequest[]) => {
    const sessionCookie = context.req.cookies[AUTH_TOKEN_COOKIE_NAME];

    if (sessionCookie === undefined || sessionCookie === "") {
        return false;
    }

    try {
        const response = await AuthService.postApiAuthGet(sessionCookie);

        if (!response.idToken || !response.claims) {
            return false;
        }

        if (verifyClaims(response.claims, ...claimRequests) === true) {
            OpenAPI.TOKEN = response.idToken;
            return true;
        }

    } catch (error) {
        return false;
    }

    return false;
}

export function redirectLogin<T>() {
    return {
        props: {} as T,
        redirect: { destination: "/" },
    };
}