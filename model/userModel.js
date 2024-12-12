const mongoose = require("mongoose");
const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
    },
    description: {
        type: String,
    },
    email: {
        type: String,
    }
});

const UserModel = mongoose.model("userModel", userModel);
module.exports = UserModel;