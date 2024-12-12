'use client';
import { set } from 'mongoose';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { use, useState,useEffect } from 'react'

export default function verifyEmailPage() {
    const searchParams = useSearchParams();
    const[Token , setToken]= useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");

    const verifyEmail = async () => {
        try {
          await fetch("/api/users/verifyemail", {
            method: "POST",
            body: JSON.stringify(Token),
          });
          setVerified(true);
        } catch (err:any) {
          setError(err.message);
          console.log(error);
        }
    }

    useEffect(() => {
      // const urlToken = window.location.search.split("=")[1];
      // setToken(urlToken || "");

      const token = searchParams.get("token");
      console.log("received token - ",token); 
      setToken(token || "");
      console.log("Token - ",Token);
    },[]);

    // todo make another useEffect to call verifyEmail function

  return (
    <div className='w-full h-screen flex flex-col items-center'>
      <h1 className='text-4xl'>Verify Email</h1>
      <h2 className='p-2 bg-orange-500'>{Token ? Token:"no token"}</h2>
      {verified && (<div><h2>Verified</h2>
      <Link href="/login" >Login</Link>
       </div> )}
       {error && <h2>{error}</h2>}
    </div>
  )
}
