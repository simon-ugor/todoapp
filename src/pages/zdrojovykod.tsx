import Navbar from '@/components/navbar'
import React, { useEffect } from 'react'
import Head from 'next/head'

const zdrojovykod = () => {

    useEffect(() => {
        window.location.assign("https://github.com/simon-ugor/todoapp");
    })

  return (
    <>
      <Head>
        <title>ToDo App - Zdrojový kód</title>
        <meta name="description" content="ToDo Application - zdrojový kód" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='h-screen w-screen grid grid-rows-2'>
          <Navbar searchFilterHidden={true} />
          <div className='bg-neutral-content h-full'></div>
      </div>
    </>
  )
}

export default zdrojovykod