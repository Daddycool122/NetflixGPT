import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptMovieSuggestions = () => {
  const { geminiMovies, geminiMovieNames } = useSelector((store) => store.gpt);
  if (!geminiMovieNames) return null;

  return (
    <div className="p-2 sm:p-4 md:p-8  sm:m-4 bg-black text-white min-h-[30vh]">
      <div className="max-w-7xl mx-auto w-full">
        {geminiMovieNames.length > 0 && (
          <h1 className="text-2xl sm:text-3xl md:text-4xl p-2 sm:p-4  text-center">
            Movie Suggestions
          </h1>
        )}

        <div className="flex flex-col gap-6">
          {geminiMovieNames.map((movie, index) => (
            <MovieList
              key={movie}
              title={movie}
              movies={geminiMovies  ? geminiMovies[index] : []}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GptMovieSuggestions