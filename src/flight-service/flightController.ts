import Flight from "../models/flightModel.js";
import { Request, Response } from "express";

const createFlight = async (req: Request, res: Response) => {
  try {

    const { origin, destination, price } = req.body;

    const missingFields = [];

    if (!origin) missingFields.push("origin");
    if (!destination) missingFields.push("destination");
    if (!price) missingFields.push("price");

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `${missingFields.join(", ")} ${missingFields.length > 1 ? 'are' : 'is'} required`
      });
    } 

    const newFlight = new Flight({ origin, destination, price });

    const flightDocument = await newFlight.save();

    
    return res.status(201).json({
      message: "Flight created successfully",
      flight: flightDocument
    });
      
  } catch (error) {
    let message = "An error occurred while creating the flight.";
    if (error instanceof Error) {
      message  = error.message;
    }

    return res.status(500).json({
      message
    
    });
  }


};

const getFlights = async (req: Request, res: Response) => {
    try
    {
        const flights = await Flight.find();
        return res.status(200).json({
            flights
        });
    }

    catch (error)
    {
        let message = "An error occurred while displaying the flight.";
        if (error instanceof Error)
        {
            message = error.message;
        }
  
        return res.status(500).json({
            message
      
        });
    }
}





    export default { createFlight, getFlights };
