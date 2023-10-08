import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  const navigate=useNavigate()
  const handleSignout=()=>{
    localStorage.clear();
    navigate("/signin")
  }
  return (
  <>
<nav className="flex justify-between px-20 py-5 items-center bg-white">
  <h1 className="text-xl text-gray-800 font-bold">Stocks</h1>
  <div className="flex items-center">
  
    <div className='flex items-center'>
        <h5 className='text-base mx-2'>{props.name}</h5>
        <button className="mx-1 bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded" onClick={handleSignout}>
 Signout
</button>
    </div>

  </div>
</nav>
  
  </>
  )
}

export default Navbar