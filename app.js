const express = require("express");
const app = express();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const router = express.Router();
const {uploadDetails,getUserDetails} =  require("./controller/userController")

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

//These routes are writted here because vercel is not recognizing
router.get("/getDetails",getUserDetails)

router.post("/upload",uploadDetails);


const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();
database.connect();


module.exports = app;
