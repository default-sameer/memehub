import React from 'react'
import { signIn } from "next-auth/react"
import Image from 'next/image'


const AccessDenied = () => {
  return (
    <>
    <div className='text-head flex flex-col justify-center items-center mx-auto h-screen pb-52 sm:pb-40'>
      <h1>Access Denied</h1>
      <div className='divider'></div>
        <div className="group text-gray-200 hover:text-sky-600 transition ease-in-out duration-200 text-center">
        <a
          className='cursor-pointer'
          onClick={(e) => {
            e.preventDefault()
            signIn('google')
          }}
          >
          You must be signed in to view this page
        </a>
          <span aria-hidden="true" className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform ease-in-out duration-200">→</span>
        </div>
          <Image src={`/gif/access-denied.gif`} alt={`Access Denied`} height={200} width={400} />
    </div>
    </>
  )
}

export default AccessDenied