import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

const Signup = ({ showToast }) => {
const navigate=useNavigate();

  const handleSignup=async (e)=>{
    try{
    localStorage.clear()
    let iemail=document.getElementById('email').value
    let iname=document.getElementById('name').value
    let ipassword=document.getElementById('password').value
    e.preventDefault();
    const response=await fetch("http://localhost:3001/v1/user/register",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({email:iemail,pass:ipassword,name:iname})


    });
    toast.loading('Creating Account...');
    const json=await response.json();
    console.log(json)
    toast.dismiss()
    if(json.message==='Created'){
        showToast('Account created successfully', 'success');
          navigate("/signin")
        
    }else{
      showToast(json.message, 'error');

    }} catch (error) {
      showToast(error.message, 'error');  
    }
}

  return (
    <>
    <Toaster position='top-center' reverseOrder={false}></Toaster>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create new account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6">
      <div>
        <label for="Name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
        <div className="mt-2">
          <input id="name" name="name" type="text"  required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div>
        <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
           
          </div>
        </div>
        <div className="mt-2">
          <input id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="submit" onClick={handleSignup} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Already a member?
      
      <Link to="/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign In Now</Link>
    </p>
  </div>
</div>
    </>
  )
}

export default Signup