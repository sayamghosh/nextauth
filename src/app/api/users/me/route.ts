import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB();

export async function POST(request: NextRequest) {
    //extract data from token
    const userId = await getDataFromToken(request);
    const foundUser = await User.findOne({_id:userId}).select("-password");

    // check if user not found
    if (!foundUser) {
        return NextResponse.json(
            { error: "User not found" },
            { status: 400 }
        );
    }
    return NextResponse.json({ message:"User found",data:foundUser });
}