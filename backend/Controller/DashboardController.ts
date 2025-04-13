import { Request, Response } from "express";
import prisma from "../DB/db.config";

export const getAllScores = async (req: Request, res: Response) => {
  try {
    const scores = await prisma.leaderBoard.findMany();
    console.log("score = " , scores);
    const newScore = scores.slice(0,15);
    console.log("new scoree ==" , newScore);
    res.status(200).json({ newScore });
    return;
  } catch (error) {
    console.log("Error in getAllScores ", error);
    res.status(500).json({ message: "error in getAllScores", error });
    return;
  }
};

export const putUserScore = async (req: Request, res: Response) => {
  try {
    const { email, score, category } = req.body;
      const newScore = await prisma.leaderBoard.create({
        data: {
          email,
          score,
          category,
        },
      });
      res.status(202).json({ message: "score added" });
      return;
  } catch (error) {
    console.log("Error in putUserScore", error);
    res.status(500).json({ message: "error in putUserScore", error });
    return;
  }
};
