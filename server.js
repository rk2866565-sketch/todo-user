import express from "express"
import dbConnect from "./src/config/dbConnect.js"
import userRoute from "./src/routes/userRoute.js";

import dotenv from "dotenv"
dotenv.config()

 

const app = express()

const port = process.env.PORT
app.use(express.json())
app.use('/user', userRoute)





dbConnect()

app.listen(port, () => {
    console.log("Server is Running at 9002 ");

})
