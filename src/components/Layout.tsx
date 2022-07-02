import React from 'react'
import Header from './Header'
import { Toaster } from 'react-hot-toast';
import Footer from './Footer';
import ScrolltoTop from './libs/ScrolltoTop';

interface Props{
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <>
    <div className='flex flex-col bg-[#1b1b1b] '>
        <Toaster 
            position="top-right" 
            reverseOrder={false} 
            toastOptions={{
              style: {
                background: '#363636',
                color: '#fff',
              },
              // Default options for specific types
              success: {
                duration: 4000,
                theme: { primary: 'green',secondary: 'black'}
              },
              error: {
                duration: 4000,
                theme: { primary: 'green',secondary: 'black'}
              },
            }} />
        <Header />
        <main className='grow flex text-[#ffffff] justify-center items-center mx-auto bg-[#1b1b1b]'> 
            <ScrolltoTop />
          {children}
        </main>
        <Footer /> 
    </div>
    </>
  )
}

export default Layout