import { NextApiResponse } from 'next';
import { withAxiom } from 'next-axiom';
import { AxiomRequest } from 'next-axiom/dist/withAxiom';
import "../../lib/apiConfig";

async function healthCheck(req: AxiomRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        req.log.info("healthCheck")
        res.json(JSON.stringify("ok"));
        res.status(200);
    }
}

export default withAxiom(healthCheck);