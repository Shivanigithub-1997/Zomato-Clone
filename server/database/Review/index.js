import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
    {
    food: {type: mongoose.Types.ObjectId, ref: "foods"},
    restaurant: {type: mongoose.Types.ObjectId, ref: "restaurants"},
    user: {type: mongoose.Types.ObjectId, ref: "user"},
    rating: {type: Number, required: true},
    reviewText: {type: String, required: true},
    isRestaurantReview: Boolean,
    isFoodReview: Boolean,
    Photos:{
        type: mongoose.Types.ObjectId,
        ref: "Images",
    },
},
  {
    timestamps: true,
  }
  ); 

export const ReviewModel = mongoose.model("Review", ReviewSchema);