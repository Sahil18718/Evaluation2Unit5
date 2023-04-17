const mongoose = require("mongoose")


// user Schema 
const blogSchema = mongoose.Schema({
    email:String,
    postnumber:Number,
    comment:String,
    age:Number
},{
    versionKey:false
})

const blogModel= mongoose.model("blog",blogSchema);

module.exports={
    blogModel
}