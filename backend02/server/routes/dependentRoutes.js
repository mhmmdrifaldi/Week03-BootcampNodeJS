import { Router } from "express";
import controller from "../controller/index";

const router = Router()

router.get('/',controller.dependentController.findAll)
router.get('/:id',controller.dependentController.findOne)
router.post('/',controller.dependentController.create)	
router.put('/:id',controller.dependentController.update)
router.delete('/:id',controller.dependentController.deleted)
router.post ('/sql/',controller.dependentController.querySQL)
export default router