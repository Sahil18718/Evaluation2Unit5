const mongoose = require("mongoose")


// user Schema 
const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    pass:{
        type: String,
        require:true,
    },
    role:{
        type:String,
        required:true,
        default:"user",
        enum :["user","Moderator"]
    }
},{
    versionKey:false
})

const UserModel= mongoose.model("user",userSchema);

module.exports={
    UserModel
}