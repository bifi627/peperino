import { NextApiRequest, NextApiResponse } from 'next';

async function healthCheck(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        res.json(JSON.stringify("ok"));
        res.status(200);
    }
}

export default healthCheck;