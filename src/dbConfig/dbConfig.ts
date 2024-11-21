import mongoose from "mongoose";

export async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        connection.on('connected',()=>{console.log("Connected to the MongoDB")})
        connection.on('error',(error)=>{console.log("Error connecting to the database",error)})
        // process.exit();
        
    } catch (error) {
        console.log("Something went wrong while connecting to the database", error);
    }
}