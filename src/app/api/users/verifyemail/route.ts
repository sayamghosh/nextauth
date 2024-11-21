import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { verify } from "crypto";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);

        const founduser = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})
        if(!founduser){
            return NextResponse.json({error:"Invalid or expired token"},{status:400});
        }
        console.log(founduser);
        founduser.isVerified = true;
        founduser.verifyToken = undefined;
        founduser.verifyTokenExpiry = undefined;

        await founduser.save();
        return NextResponse.json({message:"Email verified successfully"},{status:200});

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}
