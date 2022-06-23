import { Router } from "express";
import controller from "../controller/index";
import authJwt from '../../middleware/authJWT';

const router = Router()

router.post('/signin', authJwt.authenticate, authJwt.login)
router.post('/signup', controller.userController.signup)

export default router