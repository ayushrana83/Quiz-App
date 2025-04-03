import { Router } from "express";
const router = Router();
import { getAllScores, putUserScore } from "../Controller/DashboardController";


router.route("/get").get(getAllScores);
router.route("/add").post(putUserScore);

export default router;