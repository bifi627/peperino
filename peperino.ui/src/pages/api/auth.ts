import { CookieSerializeOptions, serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { AuthService, OpenAPI } from '../../lib/api';
import "../../lib/apiConfig";
import { AUTH_TOKEN_COOKIE_NAME, IS_LOCAL_DEV } from '../../shared/constants';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    const expiresIn = 5 * 60 * 1000;

    if (req.method === 'POST') {
        const idToken = req.body.token;

        const session = req.cookies[AUTH_TOKEN_COOKIE_NAME];

        // if id token was sent, we want to create a new session
        if (idToken) {
            console.log("TRY CREATE SESSION");
            OpenAPI.TOKEN = idToken;

            const cookie = await AuthService.postApiAuthCreate(idToken);

            if (cookie) {
                console.log("secure:" + !IS_LOCAL_DEV);
                const options: CookieSerializeOptions = { maxAge: expiresIn, httpOnly: true, secure: !IS_LOCAL_DEV, path: '/' };
                res.setHeader('Set-Cookie', serialize(AUTH_TOKEN_COOKIE_NAME, cookie, options));
                res.status(200).end();
                console.log("SESSION CREATED!");
            } else {
                res.status(401).send('Invalid authentication');
            }
        }
        // if no id token was sent and there is a session, delete session
        else if (session) {
            console.log("TRY DELETE SESSION");
            const options: CookieSerializeOptions = { httpOnly: true, secure: !IS_LOCAL_DEV, path: '/', expires: new Date(1970) };
            res.setHeader("Set-Cookie", serialize(AUTH_TOKEN_COOKIE_NAME, "__", options));
            await AuthService.postApiAuthDelete(session);
            console.log("SESSION DELETED!");
            res.status(200).end();
        }
        else {
            res.status(500).end();
        }
    }
}