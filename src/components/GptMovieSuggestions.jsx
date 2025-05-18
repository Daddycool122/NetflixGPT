import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptMovieSuggestions = () => {

  const {geminiMovies,geminiMovieNames} = useSelector((store) => store.gpt);
  if(!geminiMovieNames)return null;

  return (
    <div className='p-2 m-2 bg-black text-white'>
      <div>
        
        <h1 className='text-2xl font-bold'>Movie Suggestions</h1>
        
        {geminiMovieNames.map((movie,index)=>{
          return(
            <MovieList key={movie} title={movie} movies={geminiMovies[index]} />
          )
          
        })}
        
      </div>
    </div>
  )
}

export default GptMovieSuggestions