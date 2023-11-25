import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signUp = async (req,res,next)=>{
    const {username,email,password} = req.body;
    const hashPass = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password:hashPass});

    try{
        await newUser.save();
        res.status(201).json({message:"Saved Successfully"});

    } catch(err){
        next(err);
    }
}
    