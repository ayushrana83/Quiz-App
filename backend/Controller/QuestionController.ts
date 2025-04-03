import { Request, Response } from "express";
import prisma from "../DB/db.config";

interface Question {
    category : string ,
    question : string,
    options : string[],
    correctAnswer : string,
    title : string,
}

export const getQuestionCategoryWise =  async (req : Request , res : Response) => {
    try{
        const {id} = req.params;
        console.log("id =" , id);
        const questions = await prisma.question.findMany({where : {category : id}});
        res.status(200).json({questions});
        return;
    }
    catch(error)
    {
        console.log("error in getting questions" , error);
        res.status(500).json({message : "Error in getting questions" , error});
    }
}


export const addQuestions = async (req: Request, res: Response) => {
    try {
        const questions = req.body;

        const formattedQuestions : Question[] = questions.map((q: any) => ({
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer.toString(),
            title: q.title,
            category: q.category.toLowerCase().replace(/\s/g, "")
        }));

        await prisma.question.createMany({ data: formattedQuestions }); // Remove object spread

        res.status(200).json({ message: "Questions added successfully", formattedQuestions });
    } catch (error) {
        console.error("Error in adding questions:", error);
        res.status(500).json({ message: "Error in adding questions", error });
    }
};




export const getCategoryAndDetails = async(req : Request , res : Response)=>{
    try {
        console.log("sdfsdf");
        const questions = await prisma.question.findMany();
        const category = new Map();
        questions.map((question : Question) => {
            if(category.has(question.category))
                category.set(question.category , category.get(question.category) + 1);
            else
                category.set(question.category , 1);
        })
        console.log(category);
        res.status(200).json([...category]);
        return;
    } catch (error) {
        console.log("Error in getCategoryAndDetails ", error);
        res.status(500).json({message : "error in getCategoryAndDetails " , error});
        return;
    }
}