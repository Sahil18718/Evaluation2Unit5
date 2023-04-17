const express =require("express")
const blogRouter = express.Router()
const {blogModel} = require("../model/blogmodel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


blogRouter.get("/",async(req,res)=>{
    const token= req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,"sahil")

    try {
        if (decoded.userID) {
            const data =await blogModel.find({"userId":decoded.userID})
            res.status(200).send(data)
        } else {
            res.status(400).send("No information")
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports={
    blogRouter
}