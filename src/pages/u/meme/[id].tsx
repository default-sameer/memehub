import React from 'react'
import { GetServerSideProps } from 'next'
import prisma from '../../../lib/prisma'
import Image from 'next/image'
import { cloudinary } from '../../../utils/config'
import LikeSection from '../../../components/LikeSection'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { MemeResponse } from '../../../utils/meme'

const Meme = ({ meme }: { meme: MemeResponse }) => {
  return (
    <>
      <NextSeo
        title={`Memehub`}
        description={`One Stop For All of Your Meme Needs`}
        openGraph={{
          title: `Memehub`,
          description: `One Stop For All of Your Meme Needs`,
          url: `https://memehub.vercel.app/`,
          images: [{ url: `${cloudinary}${meme.imageUrl}.png` }],
          site_name: `Memehub`,
        }}
      />
      <div className="flex flex-col items-center justify-between p-10">
        <h1 className="pb-5 text-center font-sans text-2xl sm:text-4xl">
          Uploaded By:
          <br />
          <div className="flex justify-between">
            <label
              tabIndex={0}
              className="avatar btn btn-ghost btn-circle pr-2"
            >
              <div className="w-10 rounded-full">
                <Image
                  src={`${meme.author.image}`}
                  alt={`${meme.author.name}`}
                  height={50}
                  width={50}
                />
              </div>
            </label>
            <Link href={`/u/${meme.author.name}`}>
              <a className="relative before:absolute before:bottom-0 before:left-0 before:h-full before:w-full before:origin-bottom before:scale-y-[0.35] before:bg-sky-600 before:transition-transform before:duration-500 before:ease-in-out hover:cursor-pointer hover:before:scale-y-100">
                <span className="relative text-4xl font-thin">
                  {meme.author.name}
                </span>
              </a>
            </Link>
          </div>
        </h1>
        <Image
          className={`h-96 w-full object-contain ${
            meme.nsfw ? 'blur-lg' : ''
          } hover:blur-none`}
          src={`${cloudinary}${meme.imageUrl}.png`}
          alt="meme"
          height={450}
          width={500}
        />
        <div className="pt-3">
          <LikeSection
            likes={meme.likes}
            id={meme.id}
            user={meme.author}
            meme={meme}
          />
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id
  const meme = await prisma.meme.findUnique({
    where: {
      // @ts-ignore
      id: id,
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  })
  return {
    props: {
      meme: JSON.parse(JSON.stringify(meme)),
    },
  }
}

export default Meme
