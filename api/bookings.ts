
import { VercelRequest, VercelResponse } from "@vercel/node";
import { app, connectDB } from "../src/booking-service/index.js";

const handler = async (req: VercelRequest, res: VercelResponse) => {
    await connectDB();
    await app(req, res);
}
export default handler;