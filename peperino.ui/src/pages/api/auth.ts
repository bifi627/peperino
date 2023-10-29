import { NextApiRequest, NextApiResponse } from 'next';
import { NEXTJS_FIREBASE_COOKIE } from '../../lib/auth/shared/constants';
import { isProduction } from '../../lib/helper/common';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const idToken = req.body;
    const isProd = isProduction();
    console.log({ isProd });
    try {
        if (idToken && idToken !== "") {
            res.setHeader('Set-Cookie', `${NEXTJS_FIREBASE_COOKIE}=${idToken}; Path=/; ${isProd ? "secure;" : ""} HttpOnly`);
            console.log("Set auth cookie", idToken);
        } else {
            res.setHeader('Set-Cookie', `${NEXTJS_FIREBASE_COOKIE}=x; Path=/; ${isProd ? "secure;" : ""} HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
            console.log("Delete auth cookie");
        }
        res.end();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized' });
    }
}