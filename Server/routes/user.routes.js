import { Router } from "express";
import { handleGetAllUser, handleGetUserDetails, handleUserLogin, handleUserRegister } from "../controllers/user.controller.js";
import auth from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";


const userRouter = Router()


userRouter.post("/register" , handleUserRegister)
userRouter.post("/login" , handleUserLogin)
userRouter.get("/get-user-details" ,auth ,  handleGetUserDetails)
userRouter.get("/get-all-users" , isAdmin , handleGetAllUser)


export default userRouter