import React from 'react'


const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video pt-[25%] px-24 text-white bg-gradient-to-r from-black absolute'>
    <h1 className='text-4xl font-bold'>{title}</h1>
    <p className='py-6 text-lg w-2/4'>{overview}</p>

    <div className=' '>
  <button className=' bg-white hover:opacity-80  text-black p-4 px-12 text-xl rounded-lg '>
  ▷  Play
  </button>
  <button className='mx-2 bg-gray-500 bg-opacity-50  text-white p-4 px-12 text-xl rounded-lg '>
  ⓘ More Info
  </button>
</div>

    </div>
    
  )
}

export default VideoTitle