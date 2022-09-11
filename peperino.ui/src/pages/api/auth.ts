import { CookieSerializeOptions, serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAPI } from '../../lib/api';
import "../../lib/apiConfig";
import { AUTH_TOKEN_COOKIE_NAME, IS_LOCAL_DEV } from '../../shared/constants';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const expiresIn = 60 * 60 * 1000;
        const newToken = req.body.token;

        OpenAPI.TOKEN = newToken;

        if (newToken) {
            const options: CookieSerializeOptions = { maxAge: expiresIn, httpOnly: true, secure: !IS_LOCAL_DEV, path: '/' };
            res.setHeader('Set-Cookie', serialize(AUTH_TOKEN_COOKIE_NAME, newToken, options));
            res.status(200).end();
        }
        else {
            const options: CookieSerializeOptions = { httpOnly: true, secure: !IS_LOCAL_DEV, path: '/', expires: new Date(1970) };
            res.setHeader('Set-Cookie', serialize(AUTH_TOKEN_COOKIE_NAME, "__", options));
            res.status(200).end();
        }
    }
}