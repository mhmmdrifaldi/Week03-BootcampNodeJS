import { Router } from "express";
import controller from "../controller/index";

const router = Router()

router.get('/',controller.departmentController.findAll)
router.get('/:id',controller.departmentController.findOne)
router.post('/',controller.departmentController.create)	
router.put('/:id',controller.departmentController.update)
router.delete('/:id',controller.departmentController.deleted)
router.post ('/sql/',controller.departmentController.querySQL)
export default router