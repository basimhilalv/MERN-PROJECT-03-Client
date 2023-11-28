import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";

export const test = (req,res)=>{
    res.json({
        message:"Hiiiii basiii"
    })
}

export const updateUser = async (req,res,next)=>{
    
    if(req.user.id !== req.params.id) {
        return next(errorHandler(401,"Not authorized to update or id is incorrect"))
    };
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10)
        }
        console.log(req.user)
        const updateUser = await User.findByIdAndUpdate(req.params.id, {$set:{
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            avatar:req.body.avatar
        }},{new:true})

        const {password, ...rest} = updateUser._doc;
        res.status(201).json(rest);
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async(req,res,next)=>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"Not authorized to delete or id is incorrect"))
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token').status(200).json("User deleted"); 
    } catch (error) {
        next(error)
    }
}