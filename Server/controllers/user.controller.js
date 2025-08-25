import { configDotenv } from "dotenv";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
configDotenv()
export const handleUserRegister = async (req, res, next) => {
    try {
        console.log(req.body , "This is data")
        const { name, email, password } = req.body;
        if (!name || !name.trim() || !email || !password || !password.trim()) {
            return res.status(400).json({
                message: "Name Email and Password is required",
                error: true,
                success: false
            })
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email",
                error: true,
                success: false
            })
        }


        const user = await userModel.findOne({ email });
        console.log(user , "This is user")
        if (user) {
            return res.status(400).json({
                message: "Email is already exists",
                error: true,
                success: false
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = userModel({
            name,
            email,
            password : hashPassword,
            role: "user"
        })

        await newUser.save()

        return res.status(201).json({
            message: "User registerd succesfully",
            error: false,
            success: true,
            user: newUser
        })


    } catch (error) {
        next(error)
    }
}

export const handleUserLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password || !password.trim()) {
            return res.status(400).json({
                message: "Email and password is required",
                error: true,
                success: false
            })
        };

        const user = await userModel.findOne({ email });


        if (!user) {
            return res.status(400).json({
                message: "email and password not matched",
                error: true,
                success: false
            })
        }


        const paswordCompare = await bcrypt.compare(password, user.password);

        if (!paswordCompare) {
            return res.status(400).json({
                message: "email and password not matched",
                error: true,
                success: false
            })
        };


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)




        return res.status(200).json({
            message: "Login succesfull",
            error: false,
            success: true,
            user,
            accessToken: token
        })
    } catch (error) {
        next(error)
    }
}

export const handleGetUserDetails = async (req, res, next) => {
    try {
        const { userId } = req.body;


        if (!userId) {
            return res.status(400).json({
                message: "userId is required",
                error: true,
                success: false
            })
        }

        const user = await userModel.findById(userId).select("-password");

        if (!user) {
            return res.status(400).json({
                message: "user not found",
                error: true,
                success: false
            })
        }

        return res.status(200).json({
            message: "This is user Details",
            error: false,
            success: true,
            user
        })

    } catch (error) {
        next(error)
    }
}

export const handleGetAllUser = async (req , res , next) => {
    try {
        const {adminId} = req.body;

        if(!adminId){
            return res.status(400).json({
                message : "Only admin can access",
                error : true,
                success : false
            })
        };

        const admin = await userModel.findById(adminId);

        if(!(admin.role === "admin")){
            return res.status(400).json({
                message : "Only for admin",
                error : true,
                success : false
            })
        };
        const allUser = await userModel.find() // here i am not removing passowrd to show the password encryption on forntend
        console.log(allUser)
        

        return res.status(200).json({
            message : "These are users",
            error : false,
            success : true,
            allUser
        })
    } catch (error) {
        console.log(error , "this is error")
        next(error)
    }
}