import { Router } from "express";
import controller from "../controller/index";

const router = Router()

router.get('/',controller.projectController.findAll)
export default router