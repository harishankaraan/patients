import express from "express";
import connectDB from "./db.js";
import patients from "./megha.js";




connectDB();
const app=express();
app.use(express.json());
app.use("/patients",patients);


const port=9532;
app.listen(port,()=>{
    console.log(`server is running at ${port}`);
});