import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { api } from '../config/endpoints';
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
const Register = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const [isLoading , setIsLoading] = useState(false)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false)
    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            console.log(data, "user Register data")
            const res = await axios.post(api.user.register, data);
            console.log(res , "this is res")
            toast.success(res?.data?.message)
            navigate("/login")
            setIsLoading(false)
        } catch (error) {
            console.log(error, "Error while user Register")
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

            <form onSubmit={(e) => handleRegister(e)} className='w-[90%] md:w-[40%] px-6 py-10 mx-auto  rounded-md bg-[#C4E1E6]'>
                <p className='w-full text-center text-3xl font-serif my-10'>Register</p>
                <div className='mt-10 w-full mx-auto'>
                    <div className='w-[90%] mt-5 mx-auto'>
                        <label htmlFor="name" className='ml-3 '>Enter your name</label>
                        <input id='name' type="text" name='name' onChange={(e) => setData(prev => ({ ...prev, [e.target.name]: e.target.value }))} className='w-full h-10 rounded-md text-md pl-3  bg-[#F5F5F5] mt-3 focus:outline-[#F75A5A] focus:outline-2 ' placeholder='Enter your name' />
                    </div>
                    <div className='w-[90%] mt-5 mx-auto'>
                        <label htmlFor="email" className='ml-3 '>Enter your email</label>
                        <input id='email' type="email" name='email' onChange={(e) => setData(prev => ({ ...prev, [e.target.name]: e.target.value }))} className='w-full h-10 rounded-md text-md pl-3  bg-[#F5F5F5] mt-3 focus:outline-[#F75A5A] focus:outline-2 ' placeholder='Enter your email' />
                    </div>
                    <div className="w-[90%] mt-5 mx-auto relative">
                        <label htmlFor="password" className="ml-3">Create a password</label>
                        <input id="password" type={showPassword ? "text" : "password"} name="password" onChange={(e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))} className="w-full h-10 rounded-md text-md pl-3 pr-10 bg-[#F5F5F5] mt-3 focus:outline-[#F75A5A] focus:outline-2" placeholder="Create a password" />
                        <span className="absolute right-3 top-14 -translate-y-1/2 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)} >{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</span>
                    </div>

                </div>

                <button disabled={isLoading} className='w-[90%] ml-[5%] h-10 mt-10 rounded-md bg-[#ADB2D4] hover:text-white duration-200' type='submit'>Register</button>
                <div className='text-center font-serif mt-1'>I already have an account | <Link to="/login" className='text-blue-700'>Login</Link></div>
            </form>
        </div>
    )
}

export default Register
