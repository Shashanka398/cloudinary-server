const express = require("express");
const app = express();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
dotenv.config(); // Load environment variables from .env


const PORT = process.env.PORT || 5000; // Set default PORT if not provided in the .env file
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Import user routes
const userRoutes = require('./route/route');

// Use the user routes for the /api/v1 path
console.log("Entered backend")
app.use("/api/v1", userRoutes);

// Test route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: 'Your server is up and running....'
  });
});

// Initialize Cloudinary connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();
database.connect();
// Start the server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
