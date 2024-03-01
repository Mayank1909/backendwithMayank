import mongoose from "mongoose";
import { DATABASE_NAME } from "./constant.js";
import express from 'express';
const app = express();
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DATABASE_NAME}`)
        console.log(`\n Mongo connected !! DB host :${connectionInstance.connection.host}`);
    }

    catch (error) {
        console.log("MONGODB connection Failed", error)
        process.exit(1)
    }
}

export default connectDB;