import express  from "express";
import { UserModel } from "../../database/allModels";
import passport from "passport";
const Router = express.Router();

/**
*Route           /
*description     Get authorised user data
*params          none
*Access          Private
*Method          GET
*/

Router.get("/",  passport.authenticate("jwt", {session:false}),
async(req, res) =>{
    try{
      const {email, fullName, phoneNumber, address} = req.user ;
      return res.json({user: {email,fullName,phoneNumber, address}});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});





/**
*Route           /:_id
*description     Get  user data
*params          _id
*Access          Public
*Method          GET
*/
 Router.get("/:_id", async(req, res) => {
  try{
 const{_id} = req.params;
 const getUser = await UserModel.findById(_id);
 
 if(!getUser){
  return res.status(404).json({error: "User not Found by this id"})
 }
 return res.json({user: { fullName}});
  }catch(error){
        return res.status(500).json({error: error.message});
  }
 });



 /**
*Route           /:_id
*description     update user data by Id
*params          _id
*Access          Private
*Method          PUT
*/
Router.put("/update/:_id"), 
 passport.authenticate("jwt", {session:false}),async(req,res)=>{

  try{
   const{_id} =req.params;
   const {userData} = req.body;
   userData.password = undefined;
   const updateUserData = await UserModel.findById(
    _id, 
    {
      $set: userData,
   },
    {
      new: true,
   });
   return res.json({user: updateUserData}); 
    }catch(error){;
}
    return res.status(500).json({error: error.message})
}



export default Router;
