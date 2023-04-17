const express = require("express")
const userRouter = express.Router();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const { UserModel } = require("../model/usermodel")



// register
userRouter.post("/register",async(req,res)=>{
    const {email, pass, age} = req.body;
    try {
        bcrypt.hash(pass, 5, async(err,hash)=>{
            const user= new UserModel({email, pass:hash, age});
            await user.save()
            res.status(200).send({"msg":"New user Register"})
        })
    } catch (error) {
        res.status(400).send({"msg":"error.message"})
    }
})


module.exports={
    userRouter
}