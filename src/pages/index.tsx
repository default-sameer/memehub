import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()

  const upload = () => {
      router.push('/u/upload')
  }

  return (
  <>
    <NextSeo title='MemeHub' description='One Stop For All of Your Meme Needs' />
      <div className="max-w-screen-xl px-4 py-10 lg:items-center flex h-screen justify-center items-center">
        <div className="max-w-3xl mx-auto text-center">
          <div className='flex flex-col'>
          <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-blue-500 to-yellow-600 text-3xl sm:text-5xl">
          </h1>
          <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-blue-500 to-yellow-600 text-3xl sm:text-5xl">
            Welcome to MemeHub
          </h1>
            <h2 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-blue-500 to-purple-400 text-3xl sm:text-4xl">
              One Stop For All of Your Meme Needs
            </h2>
          </div>

          <p className="max-w-xl mx-auto mt-4 sm:leading-relaxed sm:text-xl animate-text-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,#e2e8f0,45%,#1e293b,55%,#e2e8f0)] bg-[length:250%_100%]">
            Upload, Create or Explore Memes.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              onClick={upload} 
              className="block w-full px-12 py-3 text-sm font-medium text-white bg-[#ffa31a] border border-[#ffa31a] rounded sm:w-auto active:text-opacity-75 hover:bg-transparent hover:text-white focus:outline-none focus:ring cursor-pointer">
              Upload
            </a>
            <Link href={`/explore`} >
            <a className="block w-full px-12 py-3 text-sm font-medium text-white border border-[#ffa31a] rounded sm:w-auto hover:bg-[#ffa31a] active:bg-[#ffa31a] focus:outline-none focus:ring" >
              Explore
            </a>
            </Link>
          </div>
        </div>
      </div>
  </>
  )
}

export default Home
