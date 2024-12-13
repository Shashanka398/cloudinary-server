const express = require("express");
const app = express();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const {uploadDetails,getUserDetails} =  require("./controller/userController")
const router = express.Router();
dotenv.config();


app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());


const userRoutes = require('./route/route');

// Routes
console.log("Entered backend");
app.use("/api/v1", userRoutes);

//routed not recognized by vercel
app.get("/",getUserDetails );

router.post("/upload",uploadDetails)


const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();
database.connect();

module.exports = app;