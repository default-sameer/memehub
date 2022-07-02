import Link from 'next/link'
import React from 'react'
import { signOut, useSession, signIn } from "next-auth/react";
import { BASE_URL } from '../utils/config';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {MdFileUpload} from 'react-icons/md';

const Header = () => {
    const {data:session} = useSession();
  return (
    <>
        <header className="shadow-2xl bg-[#292929]">
            <div
                className="flex items-center justify-between h-16 mx-auto max-w-screen-2xl sm:px-6 lg:px-8"
            >
                <div className="flex items-center">
                <div className="dropdown lg:hidden p-2 sm:mr-4">
                    <label tabIndex={0} className="btn btn-ghost btn-circle text-white">
                        <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                    </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-highlight text-head rounded-box w-52">
                        <li>
                            <Link href={`/`}>
                                <a>Home</a>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/explore`}>
                                <a>Explore</a>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/create`}>
                                <a>Create</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link href={`/`}>
                    <a className="flex">
                        <motion.div 
                        whileHover={{scale: 2, y: 6}} 
                        animate={{
                            scale: [1, 2, 2, 1, 1],
                            rotate: [0, 360],
                            }}>
                            <Image className="pt-2" src={`/logo/mlogo-t.svg`} alt={`MemeHub`} height={65} width={90} priority />
                        </motion.div>
                    </a>
                </Link>
                </div>

                <div className="flex items-center justify-end flex-1">
                <nav
                    className="hidden lg:uppercase text-white lg:tracking-wide lg:font-semibold lg:text-xs lg:space-x-4 lg:flex"
                >
                    <Link href={`/`}>
                    <a
                    className="block h-16 leading-[4rem] border-b-4 border-transparent hover:border-[#ffa31a]"
                    >
                    Home
                    </a>
                    </Link>
                    <Link href={`/explore`}>
                    <a
                    className="block h-16 leading-[4rem] border-b-4 border-transparent hover:border-[#ffa31a]"
                    >
                    Explore
                    </a>
                    </Link>
                    <Link href={`/create`}>
                    <a
                    className="block h-16 leading-[4rem] border-b-4 border-transparent hover:border-[#ffa31a]"
                    >
                    Create
                    </a>
                    </Link>
                    {session && 
                    <Link href={`/user/upload`}>
                    <a
                    className="h-16 leading-[4rem] border-b-4 border-transparent hover:border-[#ffa31a] font-extrabold flex justify-between "
                    >
                    <div className='pt-5 mr-1'>
                        <MdFileUpload size={20} />
                    </div>
                    Upload
                    </a>
                    </Link>
                    }
                </nav>

                <div className="flex items-center ml-8">
                    <div
                    className="flex items-center"
                    >
                    {!session && (
                    <span>
                        <a
                        onClick={(e) => {
                            e.preventDefault();
                            signIn('google');
                        }}
                        className="block p-6 border-b-4 border-transparent hover:border-[#ffa31a]"
                        >
                        <svg
                            className="w-5 h-5 cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#ffffff"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>

                        <span className="sr-only">Login</span>
                        </a>
                    </span>
                    )}
                    {session?.user && (
                        <span>
                            <>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <motion.div whileHover={{scale: 1.5}}>
                                            {session.user.image ? (<> <Image src={`${session.user.image}`} alt={`${session.user.name}`} height={50} width={50} /></>) : (<> <Image src={`./assets/m500.png`} alt={`Profile Photo`} height={50} width={50} /></>)}
                                        </motion.div>
                                    </div>
                                </label>
                                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content  text-head rounded-box w-52 bg-highlight">
                                    <li>
                                    <Link href={`/user/${session.user.name}`}>
                                        <a className="justify-between">
                                            Profile
                                        </a>
                                    </Link>
                                    </li>
                                    <li>
                                        <Link href={`/user/upload`}>
                                        <a className="justify-between">
                                            Upload
                                        </a>
                                        </Link>
                                     </li>
                                    <li>
                                        <a onClick={(e) => {
                                        e.preventDefault()
                                        signOut({callbackUrl: `${BASE_URL}`})
                                        }}>Logout</a>
                                    </li>
                                </ul>
                            </div>
                            </>
                        </span>
                        )}
                    </div>
                </div>
                </div>
            </div>
        </header>
    </>
  )
}

export default Header