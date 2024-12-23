import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
    // Configuration
    cloudinary.config({
        cloud_name: "dbcybk6xu",
        api_key: "392954612294273",
        api_secret: "jIT95_QbjUfHVEeeI8MMYJcr4Rs" // Click 'View API Keys' above to copy your API secret
    });
    const uploadOnCloudinary = async(localFilePath) => {
        try{
            if(!localFilePath){
                console.log("no local path");
                return null
            }
            console.log("testing...")
            const responce = await cloudinary.uploader.upload(localFilePath , {
                resource_type : "auto"
            })
            console.log("File is uploaded ", responce.url);
            return responce;
        }
        catch (error){
            fs.unlinkSync(localFilePath);
            return null;
        }
    }
    export {uploadOnCloudinary}