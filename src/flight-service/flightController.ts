
import Flight from "../models/flightModel.js";
import { Request, Response } from "express";

const get = async (req: Request, res: Response) => {
    const flights = await Flight.find();
    res.status(200).send(flights);
}

export default {get};