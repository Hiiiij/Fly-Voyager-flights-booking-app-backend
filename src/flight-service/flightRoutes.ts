import flightController from './flightController.js';
import { Router } from 'express';
import validator from './middleware.js'

const router =  Router();
router.post('/', validator, flightController.createFlight);
router.get('/', flightController.getFlights);
// router.get('/:id', flightController.getByID);
// router.patch('/:id', validator, flightController.updateById);
// router.delete('/:id', flightController.remove);


export default router;