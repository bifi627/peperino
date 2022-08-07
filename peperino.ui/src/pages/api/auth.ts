import { CookieSerializeOptions, serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { AuthService, OpenAPI } from '../../lib/api';
import "../../lib/apiConfig";
import { AUTH_TOKEN_COOKIE_NAME, IS_LOCAL_DEV } from '../../shared/constants';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    const expiresIn = 5 * 60 * 1000;

    if (req.method === 'POST') {
        var idToken = req.body.token;

        OpenAPI.TOKEN = idToken;

        const cookie = await AuthService.postApiAuthCreate(idToken);

        if (cookie) {
            console.log("secure:" + !IS_LOCAL_DEV);
            const options: CookieSerializeOptions = { maxAge: expiresIn, httpOnly: true, secure: !IS_LOCAL_DEV, path: '/' };
            res.setHeader('Set-Cookie', serialize(AUTH_TOKEN_COOKIE_NAME, cookie, options));
            res.status(200).end(JSON.stringify({ response: 'Succesfull logged in' }))
        } else {
            res.status(401).send('Invalid authentication');
        }
    }
}