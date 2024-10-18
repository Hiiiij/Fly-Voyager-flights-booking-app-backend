import { Flight, type IFlight } from "../models/flightModel.js";
import { Request, Response } from "express";
import { queryParser, paginationHelper } from "../utilis/apiHelpers.js";
import mongoose from "mongoose";

const flightController = {
  getFlights: async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const { origin, destination, minPrice, maxPrice, cursor } = req.query;
      const limit = Number(req.query.limit) || 10;
      const query: any = {};
      if (origin) query["departure.iata"] = origin;
      if (destination) query["arrival.iata"] = destination;
      if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
      if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };

      // Handle cursor-based pagination
      if (cursor) {
        const cursorStr = cursor as string; // cursor is a string
        if (mongoose.Types.ObjectId.isValid(cursorStr)) {
          query._id = { $gt: new mongoose.Types.ObjectId(cursorStr) }; // Use ObjectId for pagination
        } else {
          return res.status(400).json({ error: "Invalid cursor value" });
        }
      }

      const flights = await Flight.find(query).limit(limit);
      const lastFlight = flights[flights.length - 1];

      return res.status(200).json({
        flights,
        nextCursor: lastFlight ? lastFlight._id.toString() : null,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  createFlight: async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const newFlight = new Flight(req.body);
      await newFlight.save();
      return res.status(201).json(newFlight);
    } catch (error: any) {
      console.error("Error creating flight:", error);
      return res
        .status(500)
        .json({ error: error.message || "Internal server error" });
    }
  },

  searchFlights: async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const { limit, cursor } = paginationHelper(req.query);
      const filter = queryParser(req.query, ["departure", "arrival", "date"]);

      let query = Flight.find(filter);

      // Handle cursor-based pagination
      if (cursor) {
        const cursorStr = cursor as string; // Ensure cursor is a string
        if (mongoose.Types.ObjectId.isValid(cursorStr)) {
          const cursorObjectId = new mongoose.Types.ObjectId(cursorStr);
          query = query.where("_id").nin([cursorObjectId]); // Exclude documents after the cursor
        } else {
          return res.status(400).json({ error: "Invalid cursor value" });
        }
      }

      const flights = await query.limit(limit + 1).sort({ _id: 1 });

      const hasMore = flights.length > limit;
      const results: IFlight[] = flights.slice(0, limit);
      const nextCursor = hasMore
        ? results[results.length - 1]._id.toString()
        : null; // Convert ObjectId to string for cursor

      return res.json({
        flights: results,
        nextCursor,
        hasMore,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getFlightsByWeek: async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const { startDate } = req.query;

      if (!startDate || typeof startDate !== "string") {
        return res.status(400).json({ error: "Invalid startDate parameter" });
      }

      const start = new Date(startDate);
      const end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);

      const flights = await Flight.find({
        date: { $gte: start, $lt: end },
      });

      return res.json(flights);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getFlightsSortedByPrice: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { order } = req.query;
      const sortOrder = order === "desc" ? -1 : 1;

      const flights = await Flight.find().sort({ price: sortOrder });
      res.json(flights);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getFlightsSortedByDuration: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const flights = await Flight.find().sort({ duration: 1 });
      res.json(flights);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default flightController;
