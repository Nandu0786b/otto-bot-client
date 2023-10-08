import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from './navbar';
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast';
const Home = ({ showToast,showToastEmoji }) => {

const [LoggedIn,setLoggedIn]=useState(false);
const [username,setusername]=useState("john");
const [stocknames,setstocknames]=useState([])
const [selectedOptions, setSelectedOptions] = useState({label:"Select Stock"});
const [alertHistory, setalertHistory] = useState([]);

const navigate = useNavigate();
    useEffect(() => {
    getProfile()
    

}, [])



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
      showToast(json.message, 'error');
        navigate("/signin")
    }else{ 
      // toast(`Welcome ${json.profile.name}`, {
      //   icon: '👏',
      // });
        showToastEmoji(`Welcome ${json.profile.name}`);
        showToast(json.message, 'success');
        setLoggedIn(true)
        setusername(json.profile.name)
        getStocknames();
        getStockalerts();
    }
  } catch (error) {
    toast.dismiss()
    showToast('server not connected', 'error');
    showToast(error.message, 'error');
    navigate("/signin")
  }
   
}

const getStocknames=async()=>{
  try {
    const response=await fetch("http://localhost:3001/v1/stocks/availlist",{
        method:'get',
        mode: "cors",
        headers:{
            'Content-Type':'application/json',
            'jwt':localStorage.getItem('token'),
        },
       
        
        
    });
    toast.loading('Loading...');
    let json=await response.json();
    toast.dismiss()
    if(json.Verified==="false"){
        // toast.error(json.message)
        showToast(json.message, 'error');
        navigate("/signin")
    }else{
      // toast.success(json.message)
      showToast(json.message, 'success');
        let transformedArray = json.stocks.map(item => ({
            value: item.stock,
            label: item.stock+" "+item.price,
          }));
         
        setstocknames(transformedArray)
    }
  } catch (error) {
    toast.dismiss()
    showToast('server not connected', 'error');
    showToast(error.message, 'error');
    return;
  }
}
const getStockalerts=async()=>{
  try{
    const response=await fetch("http://localhost:3001/v1/alert/list",{
        method:'get',
        mode: "cors",
        headers:{
            'Content-Type':'application/json',
            'jwt':localStorage.getItem('token'),
        },
       
        
        
    });
    toast.loading('Loading Alert List...');
    let json=await response.json();
    toast.dismiss()
    if(json.Verified==="false"){
      // toast.error(json.message)
      showToast(json.message, 'error');
        navigate("/signin")
    }else{
      // toast.success(json.message)

        console.log(json)
        setalertHistory(json.alert)
    }
  } catch (error) {
    toast.dismiss()
    showToast('server not connected', 'error');
    showToast(error.message, 'error');
    return;
  }
}

 function handleSelect(data) {
  setSelectedOptions(data);
  console.log(selectedOptions)

}

const handleAlert=async(e)=>{
  try{
    e.preventDefault()
        let type=document.getElementById('type').value
        let price=document.getElementById('price').value
        let name=selectedOptions.value
        if (!type || !price || !name){
            window.alert("Check all fields again")
        }else{
          
            const response=await fetch("http://localhost:3001/v1/alert/create",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'jwt':localStorage.getItem('token'),
                },
                body: JSON.stringify({stock:name,price:price,type:type})
        
        
            });
            toast.loading('Creating ALert...');
            let json=await response.json();
            
            console.log(json)
            toast.dismiss()
            if(json.error===""){
              // toast.success(json.message)
              showToast(json.message, 'success');
                  // window.alert(`${json.message}`)
                getStockalerts();
            }else{
              showToast(json.message, 'error');
              // toast.error(json.message)
              // toast.error(json.error)
                // window.alert(`${json.message}\n${json.error}`) 
            }
        }
      } catch (error) {
        toast.dismiss()
        showToast('server not connected', 'error');
        showToast(error.message, 'error');
        return;
      }
   
}


  return (
    <>
    <Toaster position='top-center' reverseOrder={false}></Toaster>
    {LoggedIn?(<div>
        <Navbar name={username}/>
       
        {stocknames.map((e)=>
        e.stock
        )}

        <hr />
        <Select
  options={stocknames}
  placeholder="Select color"
  value={selectedOptions}
  onChange={handleSelect}
  isSearchable={true}
/>

<br />
<hr />
<form className='p-5 flex items-center justify-center flex-wrap'>
<h1 className='text-lg mx-2'>{selectedOptions.value?selectedOptions.value:"Select Stock"}</h1>
{/* <input className='text-gray-900 ring-1 ring-inset ring-gray-300 rounded-md border-0 px-2 py-1 mx-2' id='price' type="text" placeholder='Enter price'/>
<select name="type" id="type">
    <option value="greater">greater</option>
    <option value="lesser">lesser</option>
    <option value="equal">equal</option>
</select> */}


<div className='mx-2'>
  <label for="price" className="block text-sm font-medium leading-6 text-gray-900"></label>
  <div className="relative mt-2 rounded-md shadow-sm">
    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <span className="text-gray-500 sm:text-sm">₹</span>
    </div>
    <input type="text" name="price" id="price" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00" />
    <div className="absolute inset-y-0 right-0 flex items-center">
    
      <select id="type" name="type" className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
      {/* <option value="greater">greater</option>
    <option value="lesser">lesser</option> */}
    <option value="equal">equal</option>
      </select>
    </div>
  </div>
</div>



<button className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2 sm:my-0" onClick={handleAlert}>
  Create Alert
</button>
</form>

<hr />

<div className="p-5 flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className=" border border-gray-700 rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">Stock</th>
              <th scope="col" className="px-6 py-4">Alert Price</th>
              <th scope="col" className="px-6 py-4">Type</th>
              <th scope="col" className="px-6 py-4">Status</th>
              <th scope="col" className="px-6 py-4">Notify Status</th>
            </tr>
          </thead>
          <tbody>
           
          {alertHistory.map((e)=>
          <tr className="border-b dark:border-neutral-500">
            
          <td className="whitespace-nowrap px-6 py-4 text-black">{e.stock}</td>
          <td className="whitespace-nowrap px-6 py-4">{e.price}</td>
          <td className="whitespace-nowrap px-6 py-4">{e.type}</td>
          <td className="whitespace-nowrap px-6 py-4">{e.status}</td>
          <td className="whitespace-nowrap px-6 py-4">{e.notifyStatus}</td>
        </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

    </div>):(<div>Loading....</div>)}
   </>
  )
}

export default Home