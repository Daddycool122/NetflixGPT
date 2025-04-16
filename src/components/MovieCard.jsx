import React from 'react'
import { IMG_CDN } from '../utils/constants'

const MovieCard = ({ posterpath }) => {
  return (
    <div className="w-32 md:w-48 pr-2 md:pr-4 flex-shrink-0">
      <img src={IMG_CDN + posterpath} alt="Movie Poster" className="w-full h-auto rounded-lg" />
    </div>
  )
}

export default MovieCard