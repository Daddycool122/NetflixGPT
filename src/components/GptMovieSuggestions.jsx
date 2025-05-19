import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptMovieSuggestions = () => {
  const { geminiMovies, geminiMovieNames } = useSelector((store) => store.gpt);
  if (!geminiMovieNames) return null;

  return (
    <div className="relative   z-50 p-2 sm:p-4 md:p-8 sm:m-4   text-white min-h-[30vh] bg-black bg-opacity-80 rounded-xl">
      <div className="max-w-7xl mx-auto w-full relative">
        {geminiMovieNames.length > 0 && (
          <h1 className="text-2xl sm:text-3xl md:text-4xl p-2 sm:p-4 text-center font-bold">
            Movie Suggestions
          </h1>
        )}

        <div className="flex flex-col gap-6 relative">
          {geminiMovieNames.map((movie, index) => (
            <MovieList
              key={movie}
              title={movie}
              movies={geminiMovies ? geminiMovies[index] : []}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GptMovieSuggestions;