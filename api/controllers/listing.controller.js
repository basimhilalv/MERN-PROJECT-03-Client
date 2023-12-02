import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Not found"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(400, "Not authorized to delete this listing"));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted Successfully");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Not found"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(400, "Not authorized to update this listing"));
  }
  try {
    const updateList = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(201).json(updateList);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const list = await Listing.findById(req.params.id);
    if (!list) {
      return next(errorHandler(404, "No List found"));
    }
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const getAllListing = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    
    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let rent = req.query.rent;
    if (rent === undefined || rent === "false") {
      rent = { $in: [false, true] };
    }

    let sale = req.query.sale;
    if (sale === undefined || sale === "false") {
      sale = { $in: [false, true] };
    }

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const list = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      rent,
      sale,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    return res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const test = async (req,res,next)=>{
    const list = await Listing.find();
    res.json(list)
}


