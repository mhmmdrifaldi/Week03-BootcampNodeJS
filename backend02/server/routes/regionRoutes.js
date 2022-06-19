import { Router } from "express";
import controller from "../controller/index";

const router = Router()

router.get('/',controller.regionController.findAll)
router.get('/:id',controller.regionController.findOne)
router.post('/',controller.regionController.create)	
router.put('/:id',controller.regionController.update)
router.delete('/:id',controller.regionController.deleted)
router.get ('/sql/:id',controller.regionController.querySQL)
export default router