import flightController from "./flightController.js";
import { Router } from "express";
import validator from "./middleware.js";

const router = Router();
router.get("/", validator, flightController.getFlights);
router.post('/', validator, flightController.createFlight);

router.get("/search", validator, flightController.searchFlights);
router.get("/by-week", validator, flightController.getFlightsByWeek);
router.get("/sort-by-price", validator, flightController.getFlightsSortedByPrice);
router.get("/sort-by-duration", validator, flightController.getFlightsSortedByDuration);

export default router;