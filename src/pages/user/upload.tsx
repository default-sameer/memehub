import React from 'react'
import { useSession } from "next-auth/react";
import toast from 'react-hot-toast'
import { useRouter } from 'next/router';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import AccessDenied from '../../components/AccessDenied';
import { NextSeo } from 'next-seo';
import ImageUploader from '../../components/ImageUpload';

const Upload = () => {
  const {data:session} = useSession();
  const router = useRouter()

  const [file, setFile] = React.useState<File | null>(null)
  const [isLoading, setIsLoading] = React.useState(false);
  const acceptedFileExtensions = [".jpg", ".jpeg", ".png", ".gif"];
  const [nsfw, setNsfw] = React.useState(false);  

   const checkHandler = () => {
    setNsfw(!nsfw)
  }

  const handleSubmit = async (e: any) => {
      /* Prevent form from submitting by default */
      e.preventDefault();
        /* If file is not selected, then show alert message */
      if(!file) {
        toast.error('Please select an image')
        return
      }

      setIsLoading(true);
      try{
        /* Add files to FormData */
        const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`
        const formData = new FormData(e.target);
        formData.append('file', file);
        formData.append('fileName', file.name)
        formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET);
        
        const response = await axios.post(url, formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        const imageUrl = await response.data.public_id
        const imageData = await axios.post(`${BASE_URL}/api/meme?imageUrl=${imageUrl}&nsfw=${nsfw}`)
        
        
        if (response.status >= 200 && response.status < 300) {
          toast.success('Image uploaded successfully');
          return router.push("/explore");
        }

        if(imageData.status === 400) {
          toast.error('Something Went Wrong');
          return;
        }
        if(imageData.status === 200) {
          setIsLoading(false);
          toast.success('Image uploaded successfully');
        }
        
        }catch(error){
          setIsLoading(false);
          toast.error('Something Went Wrong');
        }finally{
          setIsLoading(false);
        }
  }
  if (!session) {
        return (
            <AccessDenied />
        )
  }
  return (
    <>
     <NextSeo title='Upload - Memehub' description='One Stop For All of Your Meme Needs' />
      <div className='flex flex-col max-w-xs pb-20 md:pb-0 pt-5 h-screen justify-center items-center'>
        {/* To Do */}
          {/* <ImageUploader setImageUrl={setImageUrl} /> */}
          <div className='flex justify-center mb-5 flex-col'>
            <div className='text- text-center'>
              {file && <img src={URL.createObjectURL(file)} alt="Selected Meme" />}
            </div>
            <div className='flex justify-between mb-5 pt-3'>
              <label className="block  text-xl text-center font-medium text-head" htmlFor="user_avatar">Upload Memes</label>
              {isLoading && 
                <svg role="status" className="inline w-7 h-7 mr-2 text-gray-200 animate-spin fill-[#ffa31a]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
              }
            </div>
            <form  onSubmit={handleSubmit} className='flex justify-center mb-5 flex-col'>
              <div className="w-full space-y-0.5">
                {/* <label className="text-xs font-medium text-gray-500"> Meme </label> */}
                <input
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFile(file);
                  }} 
                  accept={acceptedFileExtensions.join(',')}
                  multiple={false}
                  required
                  disabled={isLoading}
                  name="file"
                  type="file" 
                  className="block w-full cursor-pointer appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75 text-black" 
                  />
              </div>
                <label htmlFor="nsfw" className='p-2 label cursor-pointer'>
                  <input type="checkbox" disabled={isLoading} checked={nsfw} onChange={checkHandler} className='checkbox checkbox-primary' />
                  <span>Is NSFW?(Not Safe For Work)</span>
                </label>
              <button disabled={isLoading}  type="submit" className='btn glass mt-5 disabled:text-white'>{isLoading ? 'Uploading...' : 'Upload'}</button>
            </form>
          </div>
      </div>
      
    </>
  )
}

export default Upload