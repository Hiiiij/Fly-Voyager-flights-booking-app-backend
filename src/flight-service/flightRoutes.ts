import flightController from './flightController.js';
import { Router } from 'express';
import validator from './middleware.js'
const router =  Router();
// router.post('/', validator, flightController.create);
router.get('/', flightController.get);
// router.get('/:id', flightController.getByID);
// router.put('/:id', validator,flightController.updateById)
// router.delete('/:id', flightController.remove);

export default router;