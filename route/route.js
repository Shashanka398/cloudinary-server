const express = require("express")
const router = express.Router();
const {uploadDetails,getUserDetails} =  require("../controller/userController")

console.log("Entered route")
router.post("/upload",uploadDetails)
router.get('/getDetails',getUserDetails)
module.exports = router;