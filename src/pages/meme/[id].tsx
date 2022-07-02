import React from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import axios from 'axios'
import { Meme } from '../../utils/meme'
import Image from 'next/image'
import toast from 'react-hot-toast'


const Meme = ({meme}: {meme:Meme}) => {
    const router = useRouter()

    const back = () => {
        router.back()
    }

    const handleClick = () => {
        toast("Comming Soon",{
            duration: 3000,
        }
        );
    }
    

  return (
      <>
      <NextSeo title={`${meme.name} - MemeHub`} description='One Stop For All of Your Meme Needs' />
        <div className='flex flex-col justify-center items-center p-10'>
            <h1 className='text-3xl pb-5'>{meme.name}</h1>
            <Image src={meme.url} alt={meme.name} height={500} width={500}/>

            <button type="button" onClick={handleClick} className="mt-10 inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded text-[#ffffff] bg-[#ffa31a] border border-[#ffa31a] px-4 py-3 text-base font-medium transition hover:border-gray-300 hover:text-black hover:bg-gray-100 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300">
            Use this Template
            </button>

        </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query
    const res = await axios.get(`https://api.imgflip.com/get_memes`)
    const { memes }: { memes: Meme[] } = res.data.data
    const meme = memes.find((meme) => meme.id === id)

    return {
        props: { meme }
    }
};

export default Meme