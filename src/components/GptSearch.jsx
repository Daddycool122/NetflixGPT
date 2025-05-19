import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_IMG } from '../utils/constants'
const GptSearch = () => {
  return (
    <div className=''>
      <div className='fixed h-full w-full'>
        <img
          src={BG_IMG}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  )
}

export default GptSearch