import { Router } from "express";
import controller from "../controller/index";

const router = Router()

router.get('/',controller.projAssignmentController.findAll)
router.get('/:id/:id2',controller.projAssignmentController.findOne)
router.post('/',controller.projAssignmentController.create)	
router.put('/:id/:id2',controller.projAssignmentController.update)
router.delete('/:id/:id2',controller.projAssignmentController.deleted)
router.post ('/sql/',controller.projAssignmentController.querySQL)
export default router