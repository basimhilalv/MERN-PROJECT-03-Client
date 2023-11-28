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
    if(req.user.id !== req.params.id) {return next(errorHandler(401,"Not authorized to update or id is incorrect"))};
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10)
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id, {$set:{
            username:req.user.username,
            email:req.user.email,
            password:req.body.password,
            avatar:req.body.avatar
        }},{new:true})

        const {password, ...rest} = updateUser._doc;
        res.status(201).json(rest);
    } catch (error) {
        next(error)
    }
}