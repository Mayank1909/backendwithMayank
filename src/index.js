// require('dotenv').config({ path: '/env' })

import dotenv from 'dotenv';
import connectDB from './db/index.js'
import { app } from './App.js';
dotenv.config({
    path: './env'
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(` | Server is running at PORT :${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("Mongo db connection falied !!", err);
    })






// import mongoose from 'mongoose'
// import express from "express"
// import { DATABASE_NAME } from './db/constant.js'
// const app = express();

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DATABASE_NAME}`)
//         app.on("error", (error) => {
//             console.log("ERR", error)
//             throw error
//         })  // listener
//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error("ERROR:", error)

//         throw error
//     }
// })()