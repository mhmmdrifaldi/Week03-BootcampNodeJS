import { Router } from "express";
import controller from "../controller/index";

const router = Router()

router.get('/',controller.employeeController.findAll)
router.get('/:id',controller.employeeController.findOne)
router.post('/',controller.employeeController.create)	
router.put('/:id',controller.employeeController.update)
router.delete('/:id',controller.employeeController.deleted)
router.delete('/sql/:id',controller.employeeController.querySQL)
export default router