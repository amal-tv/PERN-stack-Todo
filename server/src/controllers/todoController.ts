import { Request,Response } from "express";
import prisma from "../config/db";

export const createTodo = async (req : Request,res : Response) : Promise<void>=>{
 const {title,description,userId} = req.body;

 try {
    const todo = await prisma.todo.create({
        data : {
            title,
            description,
            userId,
            done : false
        }
    })

    res.status(201).json(todo);

 } catch (error) {
    res.status(500).json({message : error})
 }
}

export const getTodos = async (req : Request , res : Response) : Promise<void> =>{
    const { userId } = req.query;
    console.log(userId)
    try {
        const todos = await prisma.todo.findMany({where : {userId : Number(userId)}})
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({message : error})
    }
}