import { flightValidator, airportValidator } from "./middleware.js";
import airportController from "./airportController.js";
import flightController from "./flightController.js";
import { Router } from "express";

const router = Router();

// Flight routes
router.get("/", flightController.getFlights);
router.post("/", flightValidator, flightController.createFlight);
router.get("/search", flightController.searchFlights);
router.get("/by-week", flightController.getFlightsByWeek);
router.get("/sort-by-price", flightController.getFlightsSortedByPrice);
router.get("/sort-by-duration", flightController.getFlightsSortedByDuration);

router.post("/airports", airportValidator, airportController.createAirport);
router.get("/airports", airportController.getAirports);

export default router;

