import { NextApiRequest, NextApiResponse } from 'next';
import "../../lib/apiConfig";

export default async function healthCheck(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        res.json(JSON.stringify("ok"));
        res.status(200);
        res.end();
    }
}