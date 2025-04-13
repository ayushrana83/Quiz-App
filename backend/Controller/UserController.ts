import { Request, Response } from "express";
import prisma from "../DB/db.config";
import bcrypyt from "bcryptjs";

interface User {
    email : string,
    password : string,
    firstName : string,
    lastName : string,
}

export const signinUserController = async (req : Request, res : Response) => {
    try
    {
        const {email , password , firstName , lastName} : User = req.body;
        // console.log(email  , password , firstName , lastName);
        if(!email || !password || !firstName || !lastName)
        {
            console.log("all fields required");
            res.status(404).json({message : "all fields required"});
            return;
        }
        const ifExists = await prisma.user.findUnique({where : {email}});
        if(ifExists)
        {
            res.status(400).json({message : "email already used"});
            console.log("email already used");
            return;
        }
        const hashedPassword = await bcrypyt.hash(password , 10);
        const user = await prisma.user.create({
            data : {
                email,
                password : hashedPassword,
                name : firstName + " " + lastName
            }
        });
        res.status(200).json({message:"user created"});
        console.log("user created");
    }
    catch(error)
    {
        console.log("error in signup", error);
        res.status(500).json({message : "Error in signup" , error});
    }     
}

export const loginUserController = async(req : Request , res : Response) => {
    try {
        const {email , password} = req.body;
        console.log("login user");
        // console.log({email , password});
        if(!email || !password)
        {
            res.status(404).json({message : "all fields required"});
            console.log("all fields required");
            return;
        }
        const user = await prisma.user.findUnique({where : {email}});
        if(!user)
        {
            console.log("user does not exists");
            res.status(404).json({message : "user does not exists"});
            return;
        }
        const isEqual = await bcrypyt.compare(password , user.password);
        // console.log(user.password ," " ,email , " " , password);
        // console.log("isequal" ,isEqual);
        if(isEqual)
        {
            console.log("login successfull");
            res.status(200).json({message : "login successfull"});
            return;
        }
        else
        {
            console.log("invalid details");
            res.status(400).json({message : "invalid details"});
            return;
        }
    } catch (error) {
        console.log("error in login" , error);
        res.status(500).json({message : "error in login" , error});
    }
}

