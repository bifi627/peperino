import { cookies } from "next/headers";
import { GetServerSidePropsContext } from "next/types";
import { PeperinoApiClient } from "../../api";
import { NEXTJS_FIREBASE_COOKIE } from "../shared/constants";
import { getApiConfig } from "../shared/getApiConfig";

export const getServerApiClient = (context: GetServerSidePropsContext) => {
    const idToken = context.req.cookies[NEXTJS_FIREBASE_COOKIE]
    return new PeperinoApiClient(getApiConfig(idToken))
};

export const getServerApiClientV2 = () => {
    const requestCookies = cookies();
    const idToken = requestCookies.get(NEXTJS_FIREBASE_COOKIE)?.value ?? "";
    return new PeperinoApiClient(getApiConfig(idToken))
}

export const getServerAuthState = () => {
    const requestCookies = cookies();
    const idToken = requestCookies.get(NEXTJS_FIREBASE_COOKIE)?.value ?? "";
    return Boolean(idToken);
}