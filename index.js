const express = require("express");
const app = express();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
dotenv.config();

// Middleware
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Import routes
const userRoutes = require('./route/route');

// Routes
console.log("Entered backend");
app.use("/api/v1", userRoutes);

// Test route (this can be accessed at /api/)
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: 'Your server is up and running....'
  });
});

// Connect to Cloudinary and database
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();
database.connect();

// Export the Express app as a Vercel function
module.exports = app;
