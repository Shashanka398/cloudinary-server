const express = require("express")
const router = express.Router();
const {uploadDetails} =  require("../controller/userController")

console.log("Entered route")
router.post("/upload",uploadDetails)
module.exports = router;