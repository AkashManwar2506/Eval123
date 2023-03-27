const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");
const {connection} = require("./config/db");
const { authenticate } = require("./middleware/authenticate.middleware");
const { postRoute } = require("./routes/post.route");
const UserRoutes = require("./routes/user.route");

const app = express();
app.use(express.json());
app.use(cors({origin:"*"}));
app.use("/users",UserRoutes);
app.use(authenticate)
app.use("/posts",postRoute);


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected");
    }
    catch(err){
        console.log(err);
    }
    console.log(`listening to port ${process.env.port}`)
})