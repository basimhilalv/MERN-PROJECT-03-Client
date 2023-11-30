import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js";

export const createListing = async (req,res,next) =>{
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error)
    }
}

export const deleteListing = async (req,res,next) =>{
    const listing = await Listing.findById(req.params.id)
    if(!listing){
        return next(errorHandler(404, "Not found"));
    }
    if(req.user.id !== listing.userRef){
        return next(errorHandler(400, "Not authorized to delete this listing"));
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Deleted Successfully');
    } catch (error) {
        next(error)
    }
}

export const updateListing = async (req,res,next) =>{
    const listing = await Listing.findById(req.params.id)
    if(!listing){
        return next(errorHandler(404, "Not found"));
    }
    if(req.user.id !== listing.userRef){
        return next(errorHandler(400, "Not authorized to update this listing"));
    }
    try {
        const updateList = await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(201).json(updateList);
    } catch (error) {
        next(error)
    }
}