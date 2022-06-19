import { Router } from "express";
import controller from "../controller/index";

const router = Router()

router.get('/',controller.projectController.findAll)
router.get('/:id',controller.projectController.findOne)
router.post('/',controller.projectController.create)	
router.put('/:id',controller.projectController.update)
router.delete('/:id',controller.projectController.deleted)
router.get ('/sql/:id',controller.projectController.querySQL)
export default router