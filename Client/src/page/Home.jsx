import { useDispatch, useSelector } from 'react-redux'
import { handleDeleteUser } from '../store/user.reducer'

const Home = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(handleDeleteUser())
    localStorage.removeItem("authorization")
  }
  return (
    <div className='flex justify-center items-center h-screen w-full'>
        {user.email ? <div className='flex justify-center items-center flex-col gap-3'>
            <p className='text-4xl text-center font-serif'>Welcome {user.name}</p>
            <p className='text-center text-xl mt-5 font-serif'>Role : {user.role}</p>
            <button className='px-5 py-2 bg-red-600 rounded-md text-white mx-' onClick={(e) => handleLogout(e)}>Log Out</button>
        </div> : <div className='flex justify-center items-center flex-col gap-3'> 
              <p  className='text-4xl text-center font-serif'>Please Login</p>
                  <p className='text-center text-xl font-serif font-semibold'>User and Admin can login by same Login page user can't access and use admin routes only admin can use </p>
          </div>}
    </div>
  )
}

export default Home
