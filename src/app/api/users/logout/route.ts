import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
    
}