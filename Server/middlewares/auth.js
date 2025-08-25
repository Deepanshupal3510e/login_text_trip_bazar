import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken"
configDotenv()
const auth = async (req , res , next) => {
    try {
        const authorization = req.headers.authorization;
        const decoded = jwt.verify(authorization.split(" ")[1] , process.env.JWT_SECRET)
        console.log(decoded , "this is decoded")
        req.body = {...req.body , userId : decoded.userId}
        next()
    } catch (error) {
        next(error)
    }
}

export default auth