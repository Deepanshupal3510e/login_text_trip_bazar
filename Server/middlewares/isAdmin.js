import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js";
configDotenv()
const isAdmin = async (req , res , next) => {
    try {
        const authorization = req.headers.authorization;
        const decoded = jwt.verify(authorization.split(" ")[1] , process.env.JWT_SECRET)
        console.log(decoded , "this is decoded")
        const user = await userModel.findById(decoded.userId)
        if(!user){
            return res.status(400).json({
                message : "user not found",
                error : true,
                success : false
            })
        };

        if(user.role === "user"){
            return res.status(400).json({
                message : "Only for admin",
                error : true,
                success : false
            })
        }
        req.body = {...req.body , adminId : decoded.userId}
        next()
    } catch (error) {
        next(error)
    }
}

export default isAdmin