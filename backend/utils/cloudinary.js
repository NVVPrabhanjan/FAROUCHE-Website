import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

    cloudinary.config({
        cloud_name: "dbcybk6xu",
        api_key: "392954612294273",
        api_secret: "jIT95_QbjUfHVEeeI8MMYJcr4Rs"
    });
    const uploadOnCloudinary = async(localFilePath) => {
        try{
            if(!localFilePath){
                console.log("no local path");
                return null
            }
            const responce = await cloudinary.uploader.upload(localFilePath , {
                resource_type : "auto"
            })
            return responce;
        }
        catch (error){
            fs.unlinkSync(localFilePath);
            return null;
        }
        finally{
            fs.unlinkSync(localFilePath);
        }
    }
    export {uploadOnCloudinary}