import express from "express";
import passport from "passport";
import{ UserModel } from "../../database/allModels";
import { ValidateSignup ,ValidateSignin} from "../../validation/auth.validation";

const Router = express.Router();


Router.post("/signup",async (req,res) => {
    try{
        await validateSignup(req.body.credentials);
        await UserModel.findByEmailAndPhone(req.body.credentials);
        const newUser = await UserModel.create(req.body.credentials);
        const token = newUser.generateJwtToken();
        return res.status(200).json({token, status: "success" });
    }catch(error){
        return res.status(500).json({ status: "failed", error: error.message});
    }
});

Router.post("/signin",async (req,res) => {
    try{
      await validateSignup(req.body.credentials);
      const  user = await UserModel.findByEmailAndPassword(req.body.credentials);
      const token =user.generateJwtToken();
      return res.status(200).json({token, status: "Success"});
      }catch(error){
          return res.status(500).json({ error: error.message});
      }
});


//Google auth here
Router.get('/google',passport.authenticate('google', {
    scope:[
        "http://www.googleapis.com/auth/userinfo.profile",
        "http://www.googleapis.com/auth/userinfo.email",
    ],
}));

Router.get("/google/callback", passport.authenticate("google", {failureRedirect:"/"}),
(req,res) =>{
      return res.status(200).json({token:req.session.passport.usertoken});
}
);


export default Router;