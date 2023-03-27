const express = require("express");
require('dotenv').config();
const { Router } = require("express");
const { PostModel } = require("../models/post.model");
const postRoute = Router();

postRoute.get("/",async(req,res)=>{
    const posts = await PostModel.find()
    res.send(posts);
})

postRoute.post("/create",async(req,res)=>{
    const payload = req.body;
    try{
        const post = new PostModel(payload);
        await post.save();
        res.send(post);
    }
    catch(err){
        console.log(err);
        res.send("err");
    }
})

postRoute.patch("/update/:id",async(req,res)=>{
    const payload = req.body;
    const id = req.params.id;
    const note = await PostModel.findOne({"_id":id});
    console.log(note);
    const userID_in_note = note.userID;

    const userID_making_req = req.body.userID;
    try{
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"you are not authorized"});
        }
        else{
            await PostModel.findByIdAndUpdate({"_id":id},payload);
            res.send("Updated the note")
        }
    }
    catch(err){
        console.log(err);
        res.status(404);
        res.send({error:"note doesn't exsist"})
    }
})

postRoute.delete("/delete/:id",async(req,res)=>{
    const payload = req.body;
    const id = req.params.id;
    const note = await PostModel.findOne({"_id":id});
    const userID_in_note = note.userID;
    const userID_making_req = req.body.userID;
    try{
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"you are not authorized"});
        }
        else{
            await PostModel.findByIdAndDelete({"_id":id});
            res.send("todo deleted");
        }
    }
    catch(err){
        console.log(err);
        res.status(404);
        res.send({error:"todo doesn't exsist"})
    }
})

module.exports={
    postRoute
}