import React from 'react'
import { useSelector} from 'react-redux'
import useMovieTrailer from '../hooks/useMovieTrailer'

const VideoBackground = ({movieId}) => {
  const trailerVideo = useSelector(store=>store.movies.trailerVideo)
  useMovieTrailer(movieId);

  return (
    <div className='w-screen aspect-video'>
      <iframe 
      className='w-screen aspect-video'
      src={`https://www.youtube.com/embed/${trailerVideo?.key}?si=rNjUuEc5lrxBg67z` + "+&autoplay=1&mute=1"} 
      title="YouTube video player"  
      
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-' 
      referrerPolicy="strict-origin-when-cross-origin" >
        
      </iframe>
    </div>
  )
}

export default VideoBackground