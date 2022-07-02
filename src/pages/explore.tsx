import React from 'react'
import { GetServerSideProps, GetStaticProps } from 'next'
import prisma from '../lib/prisma'
import { cloudinary } from '../utils/config'
import ScrollIndicator from '../components/libs/ScrollIndicator'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { MemeResponse } from '../utils/meme'
import Link from 'next/link'
import LikeSection from '../components/LikeSection'
import { motion } from 'framer-motion';

type Props ={
  memes: MemeResponse[]
}

const Explore: React.FC<Props> = (props) => {


  return (
    <>
    <div className='flex flex-col'>
      <NextSeo title='Explore - Memehub' description='One Stop For All of Your Meme Needs' />
      <ScrollIndicator>
        <div className='flex justify-between p-3'>
          <h1 className='text-center pt-3 sm:text-6xl font-sans text-4xl font-bold tracking-tight text-head'>Explore</h1>
          <div>
            {/* To Do Filter  */}
          </div>
        </div>
        {props.memes.length  === 0 ? <h1 className='text-center pt-3 text-2xl sm:text-4xl font-sans text-head p-5'>No Memes Uploaded Yet</h1> :
        <section  className="py-6 dark:bg-coolGray-800 dark:text-coolGray-50">
          <div className='container grid grid-cols-1 gap-10 md:gap-20 lg:gap-35 p-4 mx-auto  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
            {props.memes.map((meme) => { return (
              <>
            <div key={meme.id} className='border border-highlight border-x-8'>
              <a className="block">
                <div className='relative overflow-hidden'>
                  <Link href={`/user/meme/${meme.id}`}>
                  <Image
                    className={`object-contain w-full h-96 hover:cursor-pointer ${meme.nsfw ? 'blur-lg' : ''} hover:blur-none`}
                    src={`${cloudinary}${meme.imageUrl}.png`}
                    alt="meme"
                    height={450}
                    width={500}
                  />
                  </Link>
                  {meme.nsfw ? 
                    <p className='absolute w-full py-2.5 bottom-10 inset-x-0 text-center text-2xl'>NSFW</p> 
                    : ''
                  }
                </div>
                <div className='flex justify-between p-2'>
                  <div>
                    <h5 className="text-xl font-bold text-center mt-1 text-head">by: 
                    <Link href={`/user/${meme.author.name}`}>
                      <a className='relative before:absolute before:bg-sky-600 before:bottom-0 before:left-0 before:h-full before:w-full before:origin-bottom before:scale-y-[0.35] hover:before:scale-y-100 before:transition-transform before:ease-in-out before:duration-500'>
                        <span className='relative font-thin'>{meme.author.name}</span>
                      </a>
                    </Link>
                    </h5>
                  </div>
                  <LikeSection id={meme.id} likes={meme.likes} />
                </div>
              </a>
            </div>
          </>
            )})}
          </div>
        </section>
        }
      </ScrollIndicator>
    </div>
    </>
  )
}

export const getServerSideProps : GetServerSideProps = async(context) => {
  const order_by = context.query.order_by ? context.query.order_by : 'desc'
  // const likes = context.query.likes ? context.query.likes : 'asc'

  
  const memes = await prisma.meme.findMany({
    orderBy:[{
      // @ts-ignore
      createdAt: order_by,
    }],
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
      memes : JSON.parse(JSON.stringify(memes))
    }
  }
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   const memes = await prisma.meme.findMany({
//       orderBy: {
//         createdAt: 'desc'
//       }
//     });
//   const data = memes.map((entry) => ({
//     id: entry.id.toString(),
//     url: entry.url,
//     created_by: entry.created_by.toString()
//   }));
  
//   return {
//     props: {
//       data
//     },
//     revalidate: 60
//   }
// }


export default Explore