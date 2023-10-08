import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/home';
import Signin from './components/signin';
import Signup from './components/signup';
import Stocks from './components/stocks';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import { messaging } from "./firebase1.js";
import { getToken } from "firebase/messaging";

function App() {
  const requestPermission = async ()=> {
    try{
      console.log("i called")
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          "BE6NcH0SjH4pz0tKTceK-0nLSZLUMumMEjFg1KZtmi0Wfb6tNBvMAInYK3w1WjmOqMTLwNvL5axvoNwXsg_SIwU",
      });
      console.log("Token Gen", token);
      try {
        const response=await fetch("http://localhost:3001/v1/user/token",{
                  method:'POST',
                  headers:{
                      'Content-Type':'application/json',
                      'jwt':localStorage.getItem('token'),
                  },
                  body: JSON.stringify({token:token})
          
          
              });
              toast.loading('Creating ALert...');
              let json=await response.json();
              toast.dismiss()
              if(json.error===""){
                toast.success(json.message)
                    // window.alert(`${json.message}`)
              }else{
                toast.error(json.message)
                // toast.error(json.error)
                  // window.alert(`${json.message}\n${json.error}`) 
              }
      } catch (error) {
        toast.error("Not able to register push Notification")
      }
      // Send this token  to server ( db)
    } else if (permission === "denied") {
      toast.error("You denied for the notification")
      alert("You denied for the notification");
    }}
    catch(error){
      console.log(error.message)
    }
  }
  
  
  const getProfile=async()=>{
  
    try{
      const response=await fetch("http://localhost:3001/v1/user/profile",{
          method:'get',
          mode: "cors",
          headers:{
              'Content-Type':'application/json',
              'jwt':localStorage.getItem('token'),
          },
         
          
          
      });
      toast.loading('Loading...');
      let json=await response.json();
      
     console.log(json)
     toast.dismiss()
      if(json.Verified==="false"){
        showToast("Login Again", 'error');
      }else{ 
        // toast(`Welcome ${json.profile.name}`, {
        //   icon: '👏',
        // });
          console.log("status of token ", json.profile.pushEnable)
          if(!json.profile.pushEnable){
            toast.error("Push Notification not subscribed")
            requestPermission();
          }
          else{
            toast.success("Subscribed")
          }
      }
    } catch (error) {
      toast.dismiss()
    }
     
  }
  
  useEffect(() => {
    getProfile()
    
  }, [])
  const showToast = (message, type) => {
    // Show a toast notification with the provided message and type
    toast[type](message);
  };
  const showToastEmoji = (message) => {
    // Show a toast notification with the provided message and type
    toast(message, {
      icon: '👏',
    });
  };

  return (
    <>
    <Toaster position='top-center' reverseOrder={false}></Toaster>
    <Router>




    <Routes>
     
     <Route exact path="/" element={<Home showToast={showToast} showToastEmoji={showToastEmoji} />}/>
     <Route exact path="/signup"   element={<Signup showToast={showToast} />}/>
     <Route exact path="/signin" element={<Signin showToast={showToast}/> }/>
     <Route exact path="/stocks" element={<Stocks showToast={showToast}/>}/>
     
   </Routes>
    </Router>
    </>
  );
}

export default App;
