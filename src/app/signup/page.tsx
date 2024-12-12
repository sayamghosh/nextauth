"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function page() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", username: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify(user),
      });
      console.log(response);
      router.push("/login");
    } catch (error: any) {
      console.log("singup failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-2">
      <h1>{loading ? "Processing" : "Signup"} </h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input id="username" type="text" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} placeholder="username" className="text-black"/>
      <input id="email" type="text" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder="email" className="text-black"/>
      <input id="password" type="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="password" className="text-black"/>
      <button onClick={onSignup} disabled={buttonDisabled} className={`${buttonDisabled?"bg-blue-400":"bg-blue-700"} text-white p-2 rounded-md cursor-pointer`}>{buttonDisabled ? "Fill up" : "Signup"}</button>
      <Link href="/login" ><p>Visit login page</p></Link>
    </div>
  );
}

export default page;
