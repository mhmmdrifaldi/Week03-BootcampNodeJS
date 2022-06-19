import { Router } from "express";
import controller from "../controller/index";

const router = Router()

router.get('/',controller.countryController.findAll)
router.get('/:id',controller.countryController.findOne)
router.post('/',controller.countryController.create)	
router.put('/:id',controller.countryController.update)
router.delete('/:id',controller.countryController.deleted)
router.put ('/sql/:id',controller.countryController.querySQL)
export default router