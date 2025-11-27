import z from "zod";
import { asyncHandler } from "../utils/asyncHandler.js";
import type { Request, Response } from "express";
import { apiError } from "../utils/apiErrorHandler.js";
import Todo, { type ITODO } from "../models/Todo.model.js";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/apiResponseHandler.js";



const createTodo = asyncHandler(async(req:Request,res:Response)=>{
    const {content} = req.body;
    const user = req.user;
   const validateContent = z.object({
    content:z.string().min(1)
   })
   const validateData = validateContent.parse({content});
   if (!validateData || !user?._id) {
    return res.status(400).json(new apiError(400,"content is not in formate"));
   };

   const todo:ITODO = await Todo.create({
    content:validateData.content,
    owner:user._id
   });

   if(!todo){
    return res.status(500).json(new apiError(500,"failed to create todo"));
   };

   return res.status(201).json(new ApiResponse(201,todo,"todo created successfully"));

});

const DeleteTodo = asyncHandler(async (req:Request,res:Response)=>{
    const todoId = req.params.id;
    if(!todoId || !mongoose.Types.ObjectId.isValid(todoId)){
        return res.status(400).json(new apiError(400,"invalid todo id"));
    };
    const deleteTodo = await Todo.findByIdAndDelete(todoId);
    if(!deleteTodo){
        return res.status(400).json(new apiError(400,"Error in deleting todo"));
    };

    return res.status(200).json(new ApiResponse(200,"todo delete successfully"));
})

const updateTodo = asyncHandler(async (req:Request,res:Response)=>{
    const {content} = req.body;
    const todoId = req.params.id;
    if(!todoId || !mongoose.Types.ObjectId.isValid(todoId)){
        return res.status(400).json(new apiError(400,"invalid todo id"));
    };
    const validateContent = z.object({
    content:z.string().min(1)
   })
   const validateData = validateContent.parse({content});
   if (!validateData) {
    return res.status(400).json(new apiError(400,"content is not in formate"));
   };

   const updatedTodo = await Todo.findByIdAndUpdate({todoId},{
    $set:{
        content:validateData.content
    }
   },{
    new:true
   });
   if (!updatedTodo) {
        return res.status(400).json(new apiError(400,"todo is not updated"));
   }

   return res.status(200).json(new ApiResponse(200,updatedTodo,"todo updated successfully"));
})

const toggelIsTodoCompelete = asyncHandler(async(req:Request,res:Response)=>{
    const todoId = req.params.Id;
    if(!todoId || !mongoose.Types.ObjectId.isValid(todoId)){
        return res.status(400).json(new apiError(400,"invalid todo id"));
    };

    const toggleIsCompelete = await Todo.findById({todoId});

    if (!toggleIsCompelete) {
        return res.status(404).json(new apiError(404,"todo is not found"));
    };
    if (toggleIsCompelete.isCompleted) {
        const todo = await Todo.findByIdAndUpdate({todoId},{
            $set:{
                isCompleted:false
            }
        })
        if (!todo) {
            return res.status(400).json(new apiError(400,"todo is not updated"));
        }
        return res.status(200).json(new ApiResponse(200,"toggle successfull"));
    }else{
        const todo = await Todo.findByIdAndUpdate({todoId},{
            $set:{
                isCompleted:true
            }
        })
        if (!todo) {
            return res.status(400).json(new apiError(400,"todo is not updated"));
        }
        return res.status(200).json(new ApiResponse(200,"toggle successfull"));
    }
})


export {
    createTodo,
    DeleteTodo,
    updateTodo,
    toggelIsTodoCompelete
}