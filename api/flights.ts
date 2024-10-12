import { VercelRequest, VercelResponse } from "@vercel/node";
import { app, connectDB } from "../src/flight-service/index.js"; 

const handler = async (req: VercelRequest, res: VercelResponse) => {
  console.log("request is here");
  await connectDB();
  app(req, res);
};

export default handler;
