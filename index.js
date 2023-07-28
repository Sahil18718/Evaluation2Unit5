const express = require("express")
const cors=require("cors")
const {connection}=require("./db")
const {userRouter}=require("./routes/userroutes")
const {auth} = require("./middileware/authenticate")
const {blogRouter}=require("./routes/blogroutes")

require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use(auth)
app.use("/blogs",blogRouter)

app.get("/",(req,res)=>{
    res.send("Homepage")

})

app.listen(process.env.port, async()=>{
    try {
        await connection
        console.log("Connected to Mongo Atlas")
    } catch (error) {
        console.log({"msg":error.message})
    }
    console.log("server running")
})