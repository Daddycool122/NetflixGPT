import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {
  return movies && (
    <div className="px-4 md:px-6 py-4 bg-transparent">
      <h1 className="text-xl md:text-3xl text-white py-2 md:py-4">{title}</h1>
      <div className="flex overflow-x-auto space-x-4">
        <div className="flex">
          {movies.map(movie => (
            <MovieCard key={movie.id} posterpath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieList