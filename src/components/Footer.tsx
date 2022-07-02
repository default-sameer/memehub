import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {FaGithub} from 'react-icons/fa'

const Footer = () => {
  return (
    <>
      <footer className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center justify-between space-y-6 space-y-reverse px-4 py-10 text-sm font-medium text-gray-500 md:flex-row md:items-start md:space-y-0">
          <div className="flex items-center eve space-x-4">
          <nav className="flex flex-col flex-wrap items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link href={`https://github.com/default-sameer/memehub`}>
                  <a className='pb-1 cursor-pointer' target={`_blank`}><FaGithub size={20} /></a>
              </Link>
              <h1>Made with Memes by 
                <Link href={`https://sameer-joshi.com.np`}>
                  <a target={`_blank`} className="animate-text-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,#e2e8f0,45%,#1e293b,55%,#e2e8f0)] bg-[length:250%_100%]">
                  {' '}  Sameer Joshi
                  </a>
                </Link>
              </h1>
          </nav>
          </div>
      </footer>
    </>
  )
}

export default Footer