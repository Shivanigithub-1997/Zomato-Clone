import express from "express";
import passport from "passport";
import { OrderModel } from "../../database/Order";


const Router = express.Router();

/**
*Route           /
*description     Get all orders by user id
*params          none
*Access          Private
*Method          GET
*/
Router.get ("/",  passport.authenticate("jwt", {session:false}),async(req,res)=>{
    try{
    const {user} = req;
     const getORders = await OrderModel.findOne({user: user._id});
    if(!getORders)
     return res.status(400).json({error: "No orderfor this user found here"});
     return res.status(200).json({orders: getORders})
    }catch(error){
        return res.status(500).json({error:error.message}); 
    }
});


/**
*Route           /new
*description     Add new order
*params          none
*Access          Private
*Method          PUT
*/
Router.put("/new",passport.authenticate("jwt", {session:false}), async(req,res)=>{
    try{
       const{user}= req;
    
       const{orderDetails}= req.body;
       const addNewOrder = await OrderModel.findByIdAndUpdate({
        user:user._id,
       },
       {
        $push: {
           orderDetails: orderDetails,
        },
       },{
         new: true ,
       }); 
       return res.json({order: addNewOrder });
        }catch(error){
            return res.status(500).json({error:error.message}); 
        }
});




export default Router;
