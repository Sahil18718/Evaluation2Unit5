const jwt = require("jsonwebtoken")
const {UserModel} = require("../model/usermodel")

const auth = async (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decodedtoken = jwt.verify(token,"masai")
        const {userID}=decodedtoken;
        const user = await UserModel.findOne({_id:userID});
        const role = user?.role

        req.role=role
        req.body.userID = userID

        next()
    } catch (error) {
        res.status(400).send({"msg":"Unauthorised"})
        res.status(400).send({"msg":error.message})
    }
}

module.exports={
    auth
}