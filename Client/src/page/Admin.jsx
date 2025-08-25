import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../config/endpoints';

const Admin = () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [allusers , setAllUsers] = useState([])


    const handleGetAllUsers = async () => {
        try {
            const res = await axios.get(api?.user?.getAllUsers)
            console.log(res , "This is response get all user");
            setAllUsers(res?.data?.allUser)
        } catch (error) {
            console.log(error , "error while fetching all users")
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {

        if(user?.role === "admin"){
            handleGetAllUsers()
        }else{
            navigate("/")
        }
    },[user])
  return (
    <div>
            <p className='text-center font-bold font-serif text-4xl pt-15'>These are All users</p>
            <div className='w-[90%] md:w-[70%] mx-auto mt-10 flex justify-evenly  items-center gap-5 flex-wrap'>
                {allusers.map((value) => {
                    return (
                        <div key={value._id} className='w-[90%] md:w-[30%] h-auto rounded-lg bg-white flex justify-center items-center gap-8 flex-col py-10'>
                                <div className='w-20 h-20 rounded-full bg-violet-600 text-white text-center flex justify-center items-center text-4xl font-serif'>{user.email[0].toUpperCase()}</div>
                                <p>Name : {user.name}</p>
                                <p className='text-sm md:text-normal line-clamp-1'>Email : {user.email}</p>
                                <p>Role : {user.role}</p>
                        </div>
                    )
                })}
            </div>
    </div>
  )
}

export default Admin
