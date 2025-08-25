import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { toast } from 'react-toastify';
import {useDispatch, useSelector} from "react-redux"
import axios from 'axios';
import { api } from '../config/endpoints';
import { handleSetUserDetails } from '../store/user.reducer';
import { useEffect } from 'react';
const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const user = useSelector(state => state.user)
    const [showPassword , setShowPassword] = useState(false)
    const [isLoading , setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await axios.post(api?.user?.login ,  data)
            toast.success(res?.data?.message);
            dispatch(handleSetUserDetails(res?.data?.user))
            console.log(res , "this is res")
            localStorage.setItem("authorization" ,res?.data?.accessToken )
            navigate("/")
            setIsLoading(false)
        } catch (error) {
            console.log(error , "login error");
            toast.error(error?.response?.data?.message)
            setIsLoading(false)
        }
    }

     useEffect(() => {
            if(user.email){
                navigate("/")
            }
        },[user])
    return (
        <div className='w-full min-h-screen h-auto flex justify-center items-center'>

            <form onSubmit={(e) => handleLogin(e)} className='w-[90%] md:w-[40%] px-6 py-10 mx-auto  rounded-md bg-[#C4E1E6]'>
                <p className='w-full text-center text-3xl font-serif my-10'>Login</p>
                <div className='mt-10 w-full mx-auto'>
                    <div className='w-[90%] mt-5 mx-auto'>
                        <label htmlFor="email" className='ml-3 '>Enter your email</label>
                        <input id='email' type="email" name='email' onChange={(e) => setData(prev => ({ ...prev, [e.target.name]: e.target.value }))} className='w-full h-10 rounded-md text-md pl-3  bg-[#F5F5F5] mt-3 focus:outline-[#F75A5A] focus:outline-2 ' placeholder='Enter your email' />
                    </div>
                    <div className="w-[90%] mt-5 mx-auto relative">
                        <label htmlFor="password" className="ml-3">Enter your password</label>
                        <input id="password" type={showPassword ? "text" : "password"} name="password" onChange={(e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))} className="w-full h-10 rounded-md text-md pl-3 pr-10 bg-[#F5F5F5] mt-3 focus:outline-[#F75A5A] focus:outline-2" placeholder="Enter your password" />
                        <span className="absolute right-3 top-14 -translate-y-1/2 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)} >{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</span>
                    </div>
                </div>

                <button disabled={isLoading} className='w-[90%] ml-[5%] h-10 mt-10 rounded-md bg-[#ADB2D4] hover:text-white duration-200' type='submit'>Register</button>
                <div className='text-center font-serif mt-1'>I don't have a account | <Link to="/register" className='text-blue-700'>Register</Link></div>
            </form>
        </div>
    )
}

export default Login
