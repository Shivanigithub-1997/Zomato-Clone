import  express  from "express";

import { FoodModel } from "../../database/allModels";

const Router = express.Router();

/**
*Route           /:_id
*description     Get food based on id
*params          _id
*Access          Public
*Method          Get
*/
Router.get("/:_id", async(req, res) =>{
    try{
        const {_id} = req.params;
        const foods = FoodModel.findById(_id);
        return res.json({foods });
    }catch(error){
        return res.status(500).json({error:error.message})
    }
});

/**
*Route           /r/:_id
*description     Get all foods based on particular restaurant
*params          _id
*Access          Public
*Method          Get
*/
Router.get("/r/:_id", async(req, res) =>{
    try{
        const {_id} = req.params;
        const foods = await FoodModel.find({
            restaurant: _id,
        });
        return res.json({foods})
    }catch(error){
        return res.status(500).json({error:error.message})
    }
});

/**
*Route           /c/category
*description     Get all foods based on particular category
*params          category
*Access          Public
*Method          Get
*/
Router.get("/c/category", async(req, res) =>{
    try{
        const {_category} = req.params;
        const foods = await FoodModel.find({
            category: {regex: category, $options: "i"},
        });
        if(!foods){
            return res.status(404).json({error: "No food matched with $ (category)"})
        }
        return res.json({foods});
        return resjson({foods})
    }catch(error){
        return res.status(500).json({error:error.message})
    }
});


export default Router;