import passport from "passport";
import JwtPassport from "passport-jwt";

import googleoauth from "passport-google-oauth2";

import { UserModel } from "../database/allModels";

const googleStrategy = googleoauth.Strategy;
export default(passport)=> {
    passport.use(
        new googleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:4000/auth/google/callback"
        },
        async(accessToken, refreshToken, profile, done)=>{
            const newUser ={
                fullName:profile.displayName,
                email: profile.emails[0],
                profilePic: profile.photos[0].value,
            };
            try{
            const user = await UserModel.findOne({email:newUser.email});
            if(user){
            const token = user.generateJwtToken();
            done(null, {user,token })}
            else{
                const user= await UserModel.create(newUser);
                const token = user.generateJwtToken();
                done(null, {user, token})
            }
            }catch(error){
                done( error, null)
            }
        }
        )
    );
    passport.serializeUser((UserData, done)=> done(null, {...UserData}));
    passport.deserializeUser((id, done)=> done(null, id));
}; 