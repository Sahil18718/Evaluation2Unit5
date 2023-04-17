const jwt = require("jsonwebtoken")
const {UserModel} = require("../model/usermodel")
const {blacklistModel} = require("../model/blacklistmodel")

const auth = async (req, res, next) =>{
    const token = req.headers.authorization.split(" ")[1]
    // try {
    //     const token = req.headers.authorization.split(" ")[1]
    //     const decodedtoken = jwt.verify(token,"masai")
    //     const {userID}=decodedtoken;
    //     const user = await UserModel.findOne({_id:userID});
    //     const role = user?.role

    //     req.role=role
    //     req.body.userID = userID

    //     next()
    // } catch (error) {
    //     res.status(400).send({"msg":"Unauthorised"})
    //     res.status(400).send({"msg":error.message})
    // }



    try {
        const blacklisted = await blacklistModel.find({"token":token})
        if(blacklisted[0]){
            return res.status(400).json({"msg":"Unauthorized"})
        }
    } catch (error) {
        res.status(400).send({"msg":"blacklist"})
        res.status(400).send({"msg":error.message})
    }

    if(token){
        const decoded=jwt.verify(token,"masai")
        if(decoded){
            req.body.userID = decoded.userID
            next()
        }else{
            res.status(400).send({"msg":"Please login first"})
        }
    }else{
        res.status(400).send({"msg":"Please login first"})

    }

    
}

module.exports={
    auth
}