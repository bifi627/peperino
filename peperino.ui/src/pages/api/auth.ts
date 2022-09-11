import { CookieSerializeOptions, serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAPI, PeperinoApiClient } from '../../lib/api';
import "../../lib/apiConfig";
import { getApiConfig } from '../../lib/auth/shared/getApiConfig';
import { AUTH_TOKEN_COOKIE_NAME, IS_LOCAL_DEV } from '../../shared/constants';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const expiresIn = 60 * 60 * 1000;
        const newToken = req.body.token as string;

        const session = req.cookies[AUTH_TOKEN_COOKIE_NAME];

        const api = new PeperinoApiClient(getApiConfig(newToken));

        if (newToken) {
            console.log("Set new session token");

            OpenAPI.TOKEN = newToken;
            const sessionToken = await api.auth.createSession(newToken);
            OpenAPI.TOKEN = "";

            const options: CookieSerializeOptions = { maxAge: expiresIn, httpOnly: true, secure: !IS_LOCAL_DEV, path: '/' };
            res.setHeader('Set-Cookie', serialize(AUTH_TOKEN_COOKIE_NAME, sessionToken, options));
            console.log(sessionToken.substring(sessionToken.length - 5));
            res.status(200).end();
        }
        else if (session) {
            console.log("Remove session token");

            await api.auth.deleteSession(session);

            const options: CookieSerializeOptions = { httpOnly: true, secure: !IS_LOCAL_DEV, path: '/', expires: new Date(1970) };
            res.setHeader('Set-Cookie', serialize(AUTH_TOKEN_COOKIE_NAME, "__", options));
            res.status(200).end();
        }
    }
}