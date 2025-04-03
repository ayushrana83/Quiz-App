import { Router } from "express";
import { addQuestions, getCategoryAndDetails, getQuestionCategoryWise } from "../Controller/QuestionController";

const router = Router();

router.route("/category").get(getCategoryAndDetails);
router.route("/single/:id").get(getQuestionCategoryWise);
router.route("/").post(addQuestions);

export default router;