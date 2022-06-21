import { Router } from "express";
import controller from "../controller/index";

const router = Router()

router.get('/',controller.locationController.findAll)
router.post('/',controller.locationController.createNext, controller.departmentController.create)	
export default router