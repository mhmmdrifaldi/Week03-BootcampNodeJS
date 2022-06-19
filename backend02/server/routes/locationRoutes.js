import { Router } from "express";
import controller from "../controller/index";

const router = Router()

router.get('/',controller.locationController.findAll)
router.get('/:id',controller.locationController.findOne)
router.post('/',controller.locationController.create)	
router.put('/:id',controller.locationController.update)
router.delete('/:id',controller.locationController.deleted)
router.get ('/sql/:id',controller.locationController.querySQL)
export default router