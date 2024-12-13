const express = require("express");
const app = express();
const database = require("../config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
dotenv.config(); 
const PORT = process.env.PORT || 5000; 
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());


const userRoutes = require('../route/route');

console.log("Entered backend")
app.use("/api/v1", userRoutes);

// Test route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: 'Your server is up and running....'
  });
});

const cloudinary = require("../config/cloudinary");
cloudinary.cloudinaryConnect();
database.connect();
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
