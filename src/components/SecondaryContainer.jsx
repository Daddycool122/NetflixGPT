import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="bg-black px-4 md:px  py-8">
      <div className="relative z-20">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Airing Today"} movies={movies.airingTodayMovies} />
        <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
      </div>
    </div>
  )
}

export default SecondaryContainer