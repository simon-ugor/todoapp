import Navbar from '@/components/navbar'
import React, { useEffect } from 'react'

const zdrojovykod = () => {

    useEffect(() => {
        window.location.assign("https://github.com/simon-ugor/todoapp");
    })

  return (
    <div className='h-screen w-screen grid grid-rows-2'>
        <Navbar searchFilterHidden={true} />
        <div className='bg-neutral-content h-full'></div>
    </div>
  )
}

export default zdrojovykod