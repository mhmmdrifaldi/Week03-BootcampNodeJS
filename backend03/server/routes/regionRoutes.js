import { Router } from "express";
import controller from "../controller/index";

const router = Router()

router.get('/', controller.regionController.findAll)
router.post('/', controller.regionController.createNext, controller.countryController.create)	
export default router