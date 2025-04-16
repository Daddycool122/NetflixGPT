import React from 'react'

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute w-full h-[50vh] md:h-[80vh] pt-[20%] md:pt-[15%] px-4 md:px-16 text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
      <p className="py-4 text-sm md:text-lg w-full md:w-1/2">{overview}</p>
      <div className="flex space-x-2">
        <button className="bg-white hover:opacity-80 text-black py-2 px-4 md:py-3 md:px-6 text-base md:text-xl rounded-lg flex items-center">
          ▷ Play
        </button>
        <button className="bg-gray-500 bg-opacity-50 text-white py-2 px-4 md:py-3 md:px-6 text-base md:text-xl rounded-lg flex items-center">
          ⓘ More Info
        </button>
      </div>
    </div>
  )
}

export default VideoTitle