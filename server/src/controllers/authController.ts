import bcrypt from "bcryptjs";

import { Request,Response } from "express";

import prisma from "../config/db";

export const login = async (req : Request,res : Response) :  Promise<void>=>{
     console.log("hi")
    const {username,password} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where : { username}
        })

        if(!user){
             res.status(400).json({message : "invalid username or password"})
            return
            }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            res.status(400).json({message : "invalid username or password"});
           return
        }
        res.status(200).json({message : "login successfull",userId : user.id
        })
    } catch (error) {
        const errorMessage = (error as any).message || "An unknown error occurred";
      res.status(500).json({message : "an error occured",error : errorMessage });
}
}

export const signup = async (req : Request ,res : Response) : Promise<void> =>{
   const {username,firstName,lastName,email,password} : {username : string,email : string,password : string,lastName : string,firstName : string} = req.body;
     if(!username || !email || !password){
        res.status(400).json({message : "name and email is required"});
     }
  
   try {
           const existingUser = await prisma.user.findUnique({
            where : {
                email 
            }
           })
           if(existingUser){
            res.status(400).json({message : "the user already exist"});
           }
       const hashedPassword = await bcrypt.hash(password,10);
           
       const user = await prisma.user.create({
        data : {
            email,
            firstName,
            lastName,
            password : hashedPassword,
            username
        }
       })

       res.status(200).json({message : "user is created successfully",user});

   } catch (error) {
        res.status(500).json({message : "error"});
   }
}