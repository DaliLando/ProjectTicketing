const express = require ("express");
const connectDB = require("./config/dbconnect");
const authRouter = require("./routes/authRoute");
const eventRouter = require("./routes/eventRoute");
const cors = require ("cors");
const ticketRouter = require("./routes/ticketRoute");
const userRouter = require("./routes/userRoute");


const app= express();

require("dotenv").config();

let port = process.env.PORT || 4000;

connectDB();


app.use(cors({  origin: 'http://localhost:3000', // Allow both local and production URLs
    credentials:true}))

app.use(express.json())
app.use("/auth",authRouter)
app.use("/event",eventRouter)
app.use("/ticket",ticketRouter)
app.use("/user",userRouter)

app.listen(port, (err)=>{
if (err) {
    console.error(err);
}
console.log(`Server run in ${port}`);

})
