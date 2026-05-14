import express from "express";
import dbConnect from "./src/config/dbConnect.js";
import "dotenv/config";
import userRoute from "./src/routes/userRoute.js";
import todoRoute from "./src/routes/todoRoute.js";
import multerRoute from "./src/routes/multerRoute.js";

const app = express();
const port = process.env.PORT;
dbConnect();
app.use(express.json());
app.use("/upload", express.static("upload"));
app.use("/user", userRoute);
app.use("/todo", todoRoute);
app.use("/multer", multerRoute);

app.listen(port, () => {
  console.log(`Server Started on Port: ${port}`);
});