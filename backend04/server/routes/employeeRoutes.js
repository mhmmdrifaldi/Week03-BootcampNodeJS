import { Router } from "express";
import controller from "../controller/index";
import uploadImages from "../../middleware/uploadImages";

const router = Router()

router.post('/', uploadImages.uploadFiles, controller.employeeController.create)
router.get('/file/:filename', uploadImages.showFile)

export default router