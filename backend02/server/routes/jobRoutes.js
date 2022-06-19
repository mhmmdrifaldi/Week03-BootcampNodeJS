import { Router } from "express";
import controller from "../controller/index";

const router = Router()

router.get('/',controller.jobController.findAll)
router.get('/:id',controller.jobController.findOne)
router.post('/',controller.jobController.create)	
router.put('/:id',controller.jobController.update)
router.delete('/:id',controller.jobController.deleted)
router.delete ('/sql/:id',controller.jobController.querySQL)
export default router