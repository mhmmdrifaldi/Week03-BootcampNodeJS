import { Router } from "express";
import controller from "../controller/index";

const router = Router()

router.get('/',controller.jobController.findAll)
router.post('/',controller.jobController.createNext, controller.employeeController.create, controller.dependentController.create, controller.projectController.create)	
export default router