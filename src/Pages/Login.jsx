import React, { useContext, useState } from 'react'
import { GlobalContext } from '../Context/Context'
import axios from 'axios'

const Login = () => {
    const { dispatch } = useContext(GlobalContext);


  const[username,setUsername]=useState("")
  const[Password,setPassword]=useState("")

  const handlelogin= async(e)=>{
e.prevenDefault()

try {
  const apiuser= await axios.post("https://dummyjson.com/auth/login" , {username:username , Password:Password});

  dispatch({type :"USER_LOGIN" ,user:apiuser.data})

  localStorage.setItem("userToken", apiuser.data.accessToken)
} catch (error) {
  console.log(error)
  
}
  }
  return (
    <div>
      <form action="" onSubmit={handlelogin}>
      <h2>Login</h2>

        <label htmlFor="">Username <br />
          <input type="text" placeholder='Enter the name' value={username} onChange={(e)=>{setUsername(e.target.value)}} />
        </label><br />
        <label htmlFor="">
          <input type="text" placeholder='Enter the Password' value={Password} onChange={(e)=>{setPassword(e.target.value)}} />
        </label>

        <button>Login</button>
      </form>
    </div>
  )
}

export default Login