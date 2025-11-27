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
    const {todoId} = req.params;
    if(!todoId || !mongoose.Types.ObjectId.isValid(todoId)){
        return res.status(400).json(new apiError(400,"invalid todo id"));
    };
   const id = new mongoose.Types.ObjectId(todoId);

    const deleteTodo = await Todo.findByIdAndDelete(id);
    if(!deleteTodo){
        return res.status(400).json(new apiError(400,"Error in deleting todo"));
    };

    return res.status(200).json(new ApiResponse(200,"todo delete successfully"));
})

const updateTodo = asyncHandler(async (req:Request,res:Response)=>{
    const {content} = req.body;
    const {todoId} = req.params;
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
   const id = new mongoose.Types.ObjectId(todoId);
   const updatedTodo = await Todo.findByIdAndUpdate(id,{
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
    const {todoId} = req.params;
    if(!todoId || !mongoose.Types.ObjectId.isValid(todoId)){
        return res.status(400).json(new apiError(400,"invalid todo id"));
    };
   const id = new mongoose.Types.ObjectId(todoId);


    const toggleIsCompelete = await Todo.findById(id);

    if (!toggleIsCompelete) {
        return res.status(404).json(new apiError(404,"todo is not found"));
    };
    if (toggleIsCompelete.isCompleted) {
        const todo = await Todo.findByIdAndUpdate(id,{
            $set:{
                isCompleted:false
            }
        })
        if (!todo) {
            return res.status(400).json(new apiError(400,"todo is not updated"));
        }
        return res.status(200).json(new ApiResponse(200,"toggle successfull false is complete"));
    }else{
        const todo = await Todo.findByIdAndUpdate(id,{
            $set:{
                isCompleted:true
            }
        })
        if (!todo) {
            return res.status(400).json(new apiError(400,"todo is not updated"));
        }
        return res.status(200).json(new ApiResponse(200,"toggle successfull true is complete"));
    }
})


export {
    createTodo,
    DeleteTodo,
    updateTodo,
    toggelIsTodoCompelete
}