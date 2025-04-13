import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 4000;
import userRouter from "./Routes/UserRoutes";
import DashboardRouter from "./Routes/DashboardRoutes";
import QuestionRouter from "./Routes/QuestionRoutes";
import cors from "cors";
app.use(express.json());
app.use(cors());

app.use("/back/user" , userRouter);
app.use("/back/dashboard" , DashboardRouter);
app.use("/back/question" , QuestionRouter);


app.listen(port , () => {
    console.log(`server running on ${port}`);
})
