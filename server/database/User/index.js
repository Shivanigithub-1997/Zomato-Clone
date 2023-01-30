import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt, { JsonWebTokenError } from "jsonwebtoken";


const UserSchema = new mongoose.Schema(
    {
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String},
    address: [{details: {type: String}, for: {type: String}}],
    phoneNumber: [{type: Number}],
   },
  {
    timestamps: true,
  }
  ); 
    
  //attachments
  UserSchema.methods.generateJwtToken = function (){
    return JsonWebTokenError.sign({User:this._id.toString()},"ZomatoApp");
  };
  
  //helper function
   UserSchema.statics.findByEmailAndPhone = async (email, phoneNumber) => {
    const checkUserByEmail = await UserModel.findOne({email });
    const checkUserByPhoneNumber = await UserModel.findOne({phoneNumber });

    if(checkUserByEmail || checkUserByPhoneNumber){
        throw new Error("User Already Exists !!")
    }
    return false
   };
   UserSchema.statics.findByEmailAndPassword = async (email, password ) => {
    const user = await UserModel.findOne({email});
    if(!user)throw new Error("User doesn't exists");

     //Compare Password
     const doesPasswordMatch = await bcrypt.compare(password, user.password)
     if(!doesPasswordMatch)throw new Error("Invalid Credentials");

     return user;

   };
   
   UserSchema.pre('save', function (next){
     const user = this;
   
    //password is been modified or not??
    if(!user.isModified('password')) return next();
     
      //generate bcrypt and salt
      bcrypt.genSalt(8, (error,salt) => {
        if(error) return next(error);
      
        //hash the password for 8 times
        bcrypt.hash(user.password, salt, (error, hash) => {
          if(error) return next(error);

          //will be assigning hashed password back
          user.password = hash;
          return next();
        });
   });
   });
export const UserModel = mongoose.model("User", UserSchema)