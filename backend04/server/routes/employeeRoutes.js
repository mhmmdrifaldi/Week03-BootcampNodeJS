import { Router } from "express";
import controller from "../controller/index";
import uploadImages from "../../middleware/uploadImages";
	
const router = Router()

router.get('/', controller.employeeController.findAll)
router.get('/:id', controller.employeeController.findOne)
router.post('/', uploadImages.uploadFiles, controller.employeeController.create)
router.get('/file/:filename', uploadImages.showFile)
router.put('/:id', uploadImages.uploadFiles, controller.employeeController.update)
router.put('/nofile/:id', controller.employeeController.updateNoFile)
router.delete('/:id', controller.employeeController.deleted)

export default router