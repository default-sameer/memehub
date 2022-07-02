import React from 'react'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { useSession } from "next-auth/react"
import { Meme, Data } from '../utils/meme'
import Image from 'next/image'
import Link from 'next/link'
import ScrollIndicator from '../components/libs/ScrollIndicator'
import { NextSeo } from 'next-seo'

const Create: React.FC<{memes: Meme[]}> = ({memes}) => {
    return (
        <>
        <NextSeo title='Create - Memehub' description='One Stop For All of Your Meme Needs' />
        <ScrollIndicator>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-col mb-6 lg:justify-between lg:flex-row md:mb-8">
                <h2 className="max-w-lg mb-5 font-sans text-3xl font-bold tracking-tight text-head sm:text-4xl sm:leading-none md:mb-6 group">
                <span className="inline-block mb-1 sm:mb-4">
                    Choose from the given template to create memes
                </span>
                <div className="h-1 ml-auto duration-300 origin-left transform bg-deep-purple-accent-400 scale-x-30 group-hover:scale-x-100" />
                </h2>
            </div>
            <div className="grid gap-6 row-gap-5 mb-8 lg:grid-cols-4 sm:row-gap-6 sm:grid-cols-2">
                {memes.map((meme: Meme) => 
                
                <div key={meme.id} className="relative overflow-hidden transition duration-200 transform rounded hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
                    <Image
                    className="object-contain w-full h-56 md:h-64 xl:h-80"
                    src={`${meme.url}`}
                    alt={meme.name}
                    height={500}
                    width={450}
                    />
                    <div className="absolute inset-0 px-6 py-4 transition-opacity duration-200 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
                    <p className="mb-4 text-lg font-bold text-[#ffffff] text-center">{meme.name}</p>
                    <Link href={`/meme/${meme.id}`}>
                    <a>
                        <p className="text-md tracking-wide text-center text-blue-400 pt-5">Use this Template 
                            <svg className="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12">
                                <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                            </svg>
                        </p>
                    </a>
                    </Link>
                    </div>
                </div>
                
                )}
            </div>
        </div>
        </ScrollIndicator>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await axios.get(`https://api.imgflip.com/get_memes`)
    const {memes}: Data = res.data.data
    return {
        props: {memes},
    };
};

export default Create