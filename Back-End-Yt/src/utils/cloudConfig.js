import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'// file system from nodejs

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async () =>{
  try{
    if(!localFilePath)return null;

    //upload file to cloudinary
    const response =  await cloudinary.uploader.upload(localFilePath,{
      resource_type:'auto',
    });
    console.log("file uploaded successfully to cloudinary",response.url);
    return response;

  }catch(err){
    fs.unlinkSync(localFilePath);
    return null;
  }
}

export {uploadOnCloudinary};