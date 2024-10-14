import flightController from "./flightController.js";
import { Router } from "express";
import validator from "./middleware.js";

const router = Router();
router.get("/", validator, flightController.getFlights);
router.post('/', validator, flightController.createFlight);

export default router;



// router.get('/:id', flightController.getByID);
// router.patch('/:id', validator, flightController.updateById);
// router.delete('/:id', flightController.remove);
