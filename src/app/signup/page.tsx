import { set } from 'mongoose'
import React, { useState } from 'react'

function page() {

  const[user,setUser]= useState({email:"", username:"", password:""}) 
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const onSignup = async()=>{
    try {
      setLoading(true)
      const response = await fetch("http://localhost:3000/api/users/signup",{
        method:"POST",
        body:formData,
      } )
    } catch (error:any) {
      console.log("singup failed");
    }
  }


  return (
    <div>signup</div>
  )
}

export default page