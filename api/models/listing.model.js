import mongoose from 'mongoose';

const listingSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    created:{
        type:String,
        required:true,
    },
    seller:{
        type:String,
        required:true,
    },
    regularPrice:{
        type:Number,
        required:true
    },
    discountPrice:{
        type:Number,
        required:true
    },
    compatibility:{
        type:Array,
        required:true,
    },
    offer:{
        type:Boolean,
        required:true,
    },
    forSale:{
        type:Boolean,
        required:true,
    },
    forRent:{
        type:Boolean,
        required:true,
    },
    imageUrls:{
        type:Array,
        required:true,
    },
    userRef:{
        type:String,
        required:true
    }

},{
    timestamps:true
})

const Listing = mongoose.model('Listing', listingSchema);
export default Listing;