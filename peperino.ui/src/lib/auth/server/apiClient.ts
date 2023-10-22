import { GetServerSidePropsContext } from "next/types";
import { PeperinoApiClient } from "../../api";
import { NEXTJS_FIREBASE_COOKIE } from "../shared/constants";
import { getApiConfig } from "../shared/getApiConfig";

export const getServerApiClient = (context: GetServerSidePropsContext) => {
    const idToken = context.req.cookies[NEXTJS_FIREBASE_COOKIE]
    return new PeperinoApiClient(getApiConfig(idToken))
};