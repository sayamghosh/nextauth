import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/User";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from bcryptjs;
import { log } from "console";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody=request.json()
    const {username,email,password}=reqBody;
    //validation
    console.log(reqBody);

    const user =await User.findOne({email});
    if(user){
      return NextResponse.json({error:"User already exists"},{status:400});
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password,salt);
    const newUser = new User({
        username,
        email,
        password:hashedPassword
    })
    const savedUser=await newUser.save();
    console.log(savedUser);

  } catch (error:any) {
    console.error(error);
    return NextResponse.json({error:error.message},{status:500});
    
  }
}