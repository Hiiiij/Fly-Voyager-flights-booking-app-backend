import { Router } from "express";
import controller from "./bookingController.js";


const router = Router();

router.get('/', controller.get);
router.post('/', controller.post);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;