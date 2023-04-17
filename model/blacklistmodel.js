const mongoose = require("mongoose")

const blacklistSchema = mongoose.Schema({
    token:String
},{
    versionKey:false
})

const blacklistModel = mongoose.model("blacklisttoken",blacklistSchema)

module.exports={
    blacklistModel
}