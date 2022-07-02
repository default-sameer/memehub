import React from 'react'
import { GetServerSideProps } from 'next'
import prisma from '../../../lib/prisma'
import Image from 'next/image'
import { cloudinary } from '../../../utils/config'
import LikeSection from '../../../components/LikeSection'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { MemeResponse } from '../../../utils/meme'

const Meme = ({meme}: {meme:MemeResponse}) => {
  return (
    <>
        <NextSeo title={`Memehub`} description={`One Stop For All of Your Meme Needs`} openGraph={{
            title: `Memehub`,
            description: `One Stop For All of Your Meme Needs`,
            url: `https://memehub.vercel.app/`,
            images: [
                {url : `${cloudinary}${meme.imageUrl}.png`}
            ],
            site_name: `Memehub`
        }} 
        />
        <div className='flex flex-col justify-between items-center p-10'>
                <h1 className='text-center text-2xl font-sans sm:text-4xl pb-5'>
                    Uploaded By:
                    <br />
                    <div className='flex justify-between'>
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar pr-2">
                            <div className="w-10 rounded-full">
                                <Image src={`${meme.author.image}`} alt={`${meme.author.name}`} height={50} width={50} />
                            </div>
                        </label>
                        <Link href={`/user/${meme.author.name}`}>
                            <a className='relative before:absolute before:bg-sky-600 before:bottom-0 before:left-0 before:h-full before:w-full before:origin-bottom before:scale-y-[0.35] hover:before:scale-y-100 before:transition-transform before:ease-in-out before:duration-500 hover:cursor-pointer'>
                                <span className='relative font-thin text-4xl'>{meme.author.name}</span>
                            </a>
                        </Link>
                    </div>
                </h1>
                <Image
                    className={`object-contain w-full h-96 ${meme.nsfw ? 'blur-lg' : ''} hover:blur-none`}
                    src={`${cloudinary}${meme.imageUrl}.png`}
                    alt="meme"
                    height={450}
                    width={500}
                  />
                <div className='pt-3'>
                    <LikeSection id={meme.id} likes={meme.likes} />
                </div>
        </div>
    </>
  )
}

export const getServerSideProps : GetServerSideProps = async(context) => {
    const id = context.query.id
    const meme =  await prisma.meme.findUnique({
        where: {
            // @ts-ignore
            id: id
        },
        include:{
        author:{
            select: {
            name: true, image: true
            }
        }
    }
    })
    return {
        props: {
            meme: JSON.parse(JSON.stringify(meme))
        }
    }
}

export default Meme