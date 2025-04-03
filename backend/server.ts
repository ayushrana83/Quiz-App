import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 4000;
import userRouter from "./Routes/UserRoutes";
import DashboardRouter from "./Routes/DashboardRoutes";
import QuestionRouter from "./Routes/QuestionRoutes";
import path from "path";
import cors from "cors";
const _dirname = path.resolve();
app.use(express.json());
app.use(cors());

app.use("/back/user" , userRouter);
app.use("/back/dashboard" , DashboardRouter);
app.use("/back/question" , QuestionRouter);
app.use(express.static(path.join(_dirname , "/frontend")))

app.use("*" , (_, res) => {
    res.sendFile(path.resolve(_dirname , "frontend" , "index.html"));
})


app.listen(port , () => {
    console.log(`server running on ${port}`);
})
