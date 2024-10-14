import Flight from "../models/flightModel.js";
import { Request, Response } from "express";

const getFlights = async (req: Request, res: Response) => {
  try {
    const { origin, destination, minPrice, maxPrice, sort, cursor } = req.query;
    const limit = Number(req.query.limit) || 10;

    const query: any = {};
    if (origin) query["departure.iata"] = origin; // Filter by departure airport
    if (destination) query["arrival.iata"] = destination; // Filter by arrival airport
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) }; 
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) }; // Max price filter

    if (cursor) {
      // Use the cursor _id for pagination instead of skip
      query._id = { $gt: cursor };
    }

    // Fetch flights based on the cursor
    const flights = await Flight.find(query)
      .sort({ _id: 1 }) // Ensure consistent ordering by _id
      .limit(limit);

    const lastFlight = flights[flights.length - 1];

    // Return flights and the next cursor (which is the last flight's _id)
    return res.status(200).json({
      flights,
      nextCursor: lastFlight ? lastFlight._id : null,
    });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({
      message: err.message
    });
  }
};

const createFlight = async (req: Request, res: Response) => {
  try {
    const {
      flight_date,
      return_date,
      flight_status,
      departure,
      arrival,
      airline,
      flight,
      price,
      duration,
      trip_type,
      class: flightClass,
    } = req.body;

    const missingFields = [];
    if (!departure || !departure.iata || !departure.airport) missingFields.push("departure");
    if (!arrival || !arrival.iata || !arrival.airport) missingFields.push("arrival");
    if (!airline || !airline.name || !airline.iata) missingFields.push("airline");
    if (!flight || !flight.iata) missingFields.push("flight");
    if (price === undefined) missingFields.push("price");
    if (duration === undefined) missingFields.push("duration");
    if (!trip_type) missingFields.push("trip_type");
    if (!flightClass) missingFields.push("class");

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `${missingFields.join(", ")} ${missingFields.length > 1 ? "are" : "is"} required`,
      });
    }

    const newFlight = {
      flight_date: flight_date || new Date(),
      return_date: return_date || null,
      flight_status: flight_status || 'scheduled',
      departure: {
        airport: departure.airport,
        iata: departure.iata,
      },
      arrival: {
        airport: arrival.airport,
        iata: arrival.iata,
      },
      airline: {
        name: airline.name,
        iata: airline.iata,
      },
      flight: {
        number: flight.number, // Ensure you include the flight number if it's in the schema
        iata: flight.iata,
      },
      price,
      duration,
      trip_type: trip_type || 'one_way',
      class: flightClass || 'Economy',
    };

    // Save to the db
    const flightDocument = await Flight.create(newFlight);

    return res.status(201).json({
      message: "Flight created successfully",
      flight: flightDocument,
    });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({
      message: err.message || "An error occurred while creating the flight",
    });
  }
};

export default { createFlight, getFlights };
