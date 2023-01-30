import express from "express";
import passport from "passport";
import { ReviewModel } from "../../database/allModels";

const Router = express.Router();

/**
*Route           /:resId
*description     Get all review for a particular restaurant  Id
*params          none
*Access          Public
*Method          GET
*/
Router.get("/:resId",async(req,res)=>{
 try{
  const{resId}= req.params;
  const review = await ReviewModel.find({restaurants: resId}).sort({
  createdAt: -1
  });
   return res.json({review})
 }
  catch(error){

    return res.status(500).json({error: error.message});
  }
});

/**
*Route           /new
*description     Add new food/restaurant review and rating
*params          none
*Access          Private
*Method          POST
*/
Router.post("/new", passport.authenticate("jwt", {session:false}),async(req,res)=>{
  try{
     const{_id}= req.user;
     const{reviewData}= req.body;

     const newReview = await ReviewModel.create({...reviewData, user:_id});
     return res.json({newReview});
     }catch(error){;
 }
     return res.status(500).json({error: error.message})
 }
 
)


/**
*Route           /delete
*description     Delete a review
*params          none
*Access          Private
*Method          GET
*/
Router.delete("/delete/:id", passport.authenticate("jwt", {session:false}),async(req,res)=>{
  try{
     const {user}= req;
     const{_id}= req.params;
     const data = await ReviewModel.findOneAndDelete({
      _id: id,
      user: user._id
     });
     if(!data) return res.json({message: " REview was not deleted"})
     return res.json({message:"Succesfully deleted a review", data}); 
     
     }catch(error){;
 }
     return res.status(500).json({error: error.message})
 }
 
)


export default Router;
