import Navbar from '@/components/navbar'
import React from 'react'
import Head from 'next/head'

const oaplikacii = () => {
  return (
    <>
      <Head>
        <title>ToDo App - Tech stack</title>
        <meta name="description" content="ToDo Application - tech stack" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='h-screen w-screen grid grid-rows-2'>
          <Navbar searchFilterHidden={true} />
          <div className='bg-neutral-content flex items-center flex-col'>
              <h1 className='mt-2 text-3xl underline'>Tech stack</h1>
              <div className='mt-1 text-center text-xl'>
                  <p>NextJS</p>
                  <p>Tailwind CSS</p>
                  <p>DaisyUI</p>
                  <p>Zod</p>
                  <p>FetchAPI</p>
                  <p>Mockapi.io</p>
                  <p>Vercel</p>
              </div>
          </div>
      </div>
    </>
  )
}

export default oaplikacii