import { NextApiRequest, NextApiResponse } from 'next';
import { NEXTJS_FIREBASE_COOKIE } from '../../lib/auth/shared/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const idToken = req.body;
    try {
        res.setHeader('Set-Cookie', `${NEXTJS_FIREBASE_COOKIE}=${idToken}; Path=/; secure; HttpOnly`);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized' });
    }
}