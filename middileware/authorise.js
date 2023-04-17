const mongoose = require("mongoose")

const authorise = (permittedRole)=>{
    return(req,res,next)=>{
        const user_role=req.user_role

        if(permittedRole.includes(user_role)){
            next()
        }else{
            return res.send("Unauthorised")
        }
    }
}

module.exports={
    authorise
}