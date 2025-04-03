import { Router } from "express";
const router = Router();
import {loginUserController , signinUserController} from "../Controller/UserController"


router.route("/login").post(loginUserController);
router.route("/signup").post(signinUserController);

export default router;