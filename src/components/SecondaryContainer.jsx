import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector((store)=>store.movies)
  console.log(movies);
  
  return (
       
        <div className="  bg-black " >
            <div className="pl-16 -mt-52 relative z-20 bg-transparent">
            <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
            <MovieList title={"Popular"} movies={movies.popularMovies}/>
            <MovieList title={"Airing Today"} movies={movies.airingTodayMovies}/>
            <MovieList title={"Top Rated"} movies={movies.topRatedMovies}/>
            </div>
            
        </div>
    )
  
}

export default SecondaryContainer