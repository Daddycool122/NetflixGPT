import React from 'react'
import { useSelector } from 'react-redux'
import useMovieTrailer from '../hooks/useMovieTrailer'

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector(store => store.movies.trailerVideo)
  useMovieTrailer(movieId);

  return (
    <div className="w-full h-[50vh] md:h-[80vh]">
      <iframe
        className="w-full h-full object-cover"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?si=rNjUuEc5lrxBg67z` + "&autoplay=1&mute=1"}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default VideoBackground