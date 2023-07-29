const express = require("express")
const userRouter = express.Router();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const { UserModel } = require("../model/usermodel")
const {auth} =require("../middileware/authenticate")
const {blacklistModel} = require("../model/blacklistmodel")


// register for user
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

// login
userRouter.post("/login", async(req,res)=>{
    const {email, pass} =req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass, user.pass, (err,result)=>{
                if(result){
                    
                    const token = jwt.sign({"userID":user._id},"sahil",{expiresIn:60})
                    const refreshtoken= jwt.sign({"userID":user._id},"refresh",{expiresIn:180})
                    res.status(200).send({"msg":"Login Successful","token":token,"refresh-token":refreshtoken})
                }else{
                    res.status(400).send({"msg":"Wrong Data"})
                }
            })
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

// logout
userRouter.get("/logout",auth,async(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1]
    try {
        const data = new blacklistModel({token})
        await data.save()
        res.status(200).send({"msg":"Logout Successful"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})




userRouter.get("/newtoken",(req,res)=>{
    const refreshtoken=req.headers.authorization?.split(" ")[1]
    const decoded = jwt.verify(refreshtoken,"refresh")

    if (decoded) {
        const token = jwt.sign({"userID":decoded.userID},"sahil",{expiresIn:60})
        res.status(200).send({"msg":token})
        res.status(200).send({"Token":token})
    } else {
        res.status(400).send({"msg":error.message})
    }
})

module.exports={
    userRouter
}