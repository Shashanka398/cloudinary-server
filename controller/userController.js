
const UserModel= require("../model/userModel")
const cloudinary = require("cloudinary").v2;

exports.uploadDetails = async (req, res) => {
    console.log("Entered uploadfile")
    try {
        console.log(req)
        let response;
        const { name, description, email,url } = req.body;
        console.log(name, description, email);

        if(!url){
            const videoFile = req.files.displayPicture;
            const supportedTypes = ["mp4", "mov"];
            const fileType = videoFile.name.split(".")[1].toLowerCase();
    
            if (!isFileTypeSupported(fileType, supportedTypes)) {
                res.status(400).json({
                    success: false,
                    message: "File type not supported"
                })
            }
            response = await uploadFileToCloudinary(videoFile, "FileApp");
            console.log("url",response.secure_url)
        }
 
     
        const vidFile = new UserModel({
            name,
            description,
            email,
            fileUrl: url?url:response.secure_url
        })

        const file = await vidFile.save();

        res.status(200).json({
            success: true,
            message: "video file uploaded successfully",
            file: file
        })
    }
    catch (err) {
        console.error(err)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

exports.getUserDetails  =async(req,res)=>{
    try{
       
        const data = await UserModel.find()
        res.status(200).json({
            success: true,
            
            message: "video file uploaded successfully",
            data: data
        })
    }catch(error){
        console.error(err)
        res.status(400).json({
            success: false,
            message: "Error while getting details "+err
        })
    }
}


const isFileTypeSupported=(fileType, supportedTypes)=> {
    return supportedTypes.includes(fileType);
}
const  uploadFileToCloudinary= async(file, folder, quality) =>{
    const options = { folder };
    if (quality) {
        options.quality = quality;
    }
    options.resource_type = "auto"
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}