import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { handleSetUserDetails } from '../store/user.reducer'
import { api } from '../config/endpoints'

const Navbar = () => {
  const [authorization, setAuthorization] = useState(localStorage.getItem("authorization") || "");
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()



  const getUserDetails = async () => {
    try {
      if (!authorization) {
        return;
      }
      const res = await axios.get(api?.user?.getUserDetails)
      dispatch(handleSetUserDetails(res?.data?.user))
    } catch (error) {
      // toast.error(error?.response?.data?.message)
      console.log(error , "this is get user details error")
    }
  }

  useEffect(() => {
    if (authorization) {
      axios.defaults.headers.common["authorization"] = `Bearer ${authorization}`;
      axios.defaults.headers.common["Content-Type"] = "application/json";
      getUserDetails()
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [])

  useEffect(() => {
    console.log(user, "this is user")
  }, [user])
  return (
    <>
      <section className='w-full sticky top-0 left-0 h-20 flex justify-between items-center px-5 md:px-10 bg-[#8DBCC7]'>
        <Link to="/" className='text-2xl font-extrabold text'>LOGO</Link>
        {user.email ? <div className='flex gap-3 px-3 h-full items-center'>
            {user.role == "admin" ? <Link to="/admin" className='md:px-8 h-full duration-400 font-serif hover:bg-[#EBFFD8] flex justify-center items-center'>Admin</Link> : ""}
            <p>{user.name}</p>
            <div className='w-10 h-10 rounded-full  font-bold bg-black text-white flex justify-center items-center'>{user.email[0].toUpperCase()}</div>
        </div> : <div className='flex gap-3 px-3 h-full items-center'>
          <Link to="/login" className='md:px-8 h-full duration-400 font-serif hover:bg-[#EBFFD8] flex justify-center items-center'>Login</Link>
          <Link to="/register" className='md:px-8 h-full duration-400 font-serif hover:bg-[#EBFFD8] flex justify-center items-center'>Register</Link>
        </div>}

      </section>
    </>
  )
}

export default Navbar
