const express = require("express");
const app = express();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
dotenv.config();


app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());


const userRoutes = require('./route/route');


app.use("/api/v1", userRoutes);

app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"Backend running in vercel !!!!"
    })
} );


const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();
database.connect();


module.exports = app;
