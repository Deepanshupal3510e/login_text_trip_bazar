import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <main className='bg-[#F5F5F5] min-h-screen'>
        <Outlet />
        <ToastContainer />
      </main>
    </>
  )
}

export default App
