import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
const Stocks = ({ showToast }) => {
    const [LoggedIn,setLoggedIn]=useState(true);
const [name,setname]=useState("john");
const navigate = useNavigate();
useEffect(() => {
    // getProfile()
    console.log("useEffect")
 
}, [])

const getStocks=async()=>{
    try{
    const response=await fetch("http://localhost:3001/v1/stocks/availlist",{
        method:'get',
        headers:{
            'Content-Type':'application/json',
        
        },
        
    });
    let json=await response.json();
    console.log(json)
    if(json.Verified==="false"){
        showToast(json.message, 'error');
        navigate("/signin")
    }
    else{
       showToast(json.message, 'success');
    }} catch (error) {
        showToast(error.message, 'error');
    }
   
}
  return (
    <div>Stocks</div>
  )
}

export default Stocks