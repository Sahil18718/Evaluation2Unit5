const express = require("express")
const cors=require("cors")
const {connection}=require("./db")



require("dotenv").config()


const app = express()
app.use(express.json())
app.use(cors())

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