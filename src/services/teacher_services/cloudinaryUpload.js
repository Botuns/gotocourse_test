import toast from "react-hot-toast";

const cloud_name= 'dobksjz6x'
const upload_preset ='ml_default'

/**
 * The function `saveToCloudinary` is an asynchronous function that takes an image as input and saves
 * it to Cloudinary, returning the secure URL of the uploaded image.
 * @param image - The image parameter is the image file that you want to save to Cloudinary. It should
 * be a valid image file in either JPEG or PNG format.
 * @returns the imageURL, which is the secure URL of the uploaded image on Cloudinary.
 */
export const saveToCloudinary = async (image)=>{
let imageURL;
try {
    if(
        image !=null&&(image.type==='image/jpeg'||image.type==='image/jpg'||image.type==='image/png')
    ){
        const newimage = new FormData();
        newimage.append('file',image)
        newimage.append('cloud_name',cloud_name)
        newimage.append('upload_preset',upload_preset)

        // save image to cloudinary
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/upload`,{
            method:'POST',
            body:newimage
        })
        const imgData = await response.json()
        console.log(imgData)
        imageURL= imgData.secure_url.toString() 
        return imageURL

    }
    return null
} catch (error) {
 toast.error(error.message) 
}
}