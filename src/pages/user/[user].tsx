import React from 'react'
import { getSession } from "next-auth/react";
import axios from 'axios';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import prisma from '../../lib/prisma';
import { cloudinary } from '../../utils/config';
import {FiSettings} from 'react-icons/fi';
import { shortenText } from '../../utils/helpers';
import { BASE_URL } from '../../utils/config';

const Profile = ({user, session}) => {

  const [username, setUserName] = React.useState('')
  const [avatar, setAvatar] = React.useState('')
  const [bio, setBio] = React.useState('')
  const [bioModal, setBioModal] = React.useState('')
  const [showEditModal, setShowEditModal] = React.useState(false)
  const [memes, setMemes] = React.useState([])

  

  React.useEffect(() => {
    const userData = JSON.parse(user)
    setUserName(userData.name)
    setAvatar(userData.image)
    setBio(userData.bio)
    setMemes(userData.memes)
  }, [])

  async function handleSubmit(){
    const updatedBio = shortenText(bioModal, 200)
    setBio(updatedBio)
    try{
      const body = {updatedBio}
      await axios.post(`${BASE_URL}/api/user/update-bio`,{
        headers: {'Contect-Type': 'application/json'},
        body: JSON.stringify(body)
      })
    }catch(err){
      console.error(err)
    }
  }

  function toggleModal() {
    setShowEditModal(!showEditModal)
  }

  return (
    <>
      <NextSeo title={`${username} | Memehub`} description='One Stop For All of Your Meme Needs' />
      <div className=' mx-auto p-5 w-96'>
        {/* Modal */}
        <div className={showEditModal ? "absolute inset-0 w-full h-full flex justify-center items-center z-20" : "hidden"}>
          <div className="h-48 w-5/6 max-w-lg mx-auto my-auto rounded bg-white z-30">
            <div className="flex flex-col justify-center items-center space-y-4 max-w-md w-5/6 mx-auto h-full">
              <textarea
                rows={3}
                className="w-full form-textarea border border-[#ffa31a] rounded p-2 bg-[#1b1b1b] "
                placeholder="Say Something, Anything"
                onChange={(e) => setBioModal(e.target.value)}
              />
              <div className="flex justify-center w-full space-x-4">
                <button
                  className="py-1 px-2 bg-palette-primary rounded text-white focus:outline-none bg-[#ffa31a]"
                  onClick={handleSubmit}
                >
                  Submit
              </button>
                <button
                  className="py-1 px-2 bg-palette-primary rounded text-black bg-red-500 focus:outline-none"
                  onClick={toggleModal}
                >
                  Cancel
              </button>
              </div>
            </div>
          </div>
        </div>
        {/* Modal */}
        <article className="p-4 bg-gray-800 border border-gray-700 rounded-xl ">
          <div className="flex items-center">
            {/* <Image
              src={`${avatar}`}
              alt={`${username}'s avatar`}
              className="w-16 h-16 rounded-full"
              height={50}
              width={50}
            /> */}

            <div className="ml-3">
              <h5 className="text-lg font-medium text-white">{username}</h5>
              <div className="flow-root">
                <div className="flex flex-wrap -m-1 flex-col">
                  <div className='flex justify-between'>
                    <p className="p-1 leading-none text-paragraph">
                      {username === session?.user.name ? `${session.user.email}` : ''}
                    </p>
                    {username === session?.user.name ? <>
                      <p className={``}>
                        <button onClick={() => setShowEditModal(true)}>
                          <FiSettings size={25} />
                        </button>
                      </p>
                    </> 
                    : ''}
                  </div>
                  {bio ? 
                    <p className='px-1 pt-2'>
                      {bio}
                    </p>
                  : ''}
                </div>
              </div>
            </div>
          </div>
      </article>
        <div className="mt-4 space-y-2">
          {memes.length === 0 ? `No Memes Uploaded By ${username}` : 
          <>
          <h1 className='text-center'>Memes by {username}</h1>
          {memes.map((meme) => { return (
            <div className='p-1'>
            <Image
                  className={`object-contain w-full h-96 ${meme.nsfw ? 'blur-lg' : ''} hover:blur-none`}
                  src={`${cloudinary}${meme.imageUrl}.png`}
                  alt="meme"
                  height={500}
                  width={500}
                />
            </div>
            )})}
          </>
          }
        </div>
    </div>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const response = await prisma.user.findUnique({
    where:{
      // @ts-ignore
      name: context.params.user
    },
    select: {
      name: true,
      image: true,
      bio:true,
      memes:{
        orderBy:{
          createdAt: 'desc'
        }
      }
    },
  })
  const user = JSON.stringify(response)
  return {  
    props: {
        user, session
    },
  };
};

export default Profile