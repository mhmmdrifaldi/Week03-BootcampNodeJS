import { Router } from "express";
import controller from "../controller/index";

const router = Router()

router.get('/',controller.projAssignmentController.findAll)
router.post('/',controller.projAssignmentController.create)
export default router