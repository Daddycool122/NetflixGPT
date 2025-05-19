import React, { useRef, useState } from "react";
import { API_OPTIONS, BG_IMG } from "../utils/constants";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import { ai } from "../utils/openai";
import { useDispatch } from "react-redux";
import { addGeminiMovieResult, addGeminiMovieNames } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovieDetails = async (movieName) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    try {
      setIsLoading(true);
      const gptQuery =
        "Act as a movie recommendation engine. Recommend me 5 comma separated movies based on the following query: " +
        searchText.current.value +
        ". like the example result giveh ahead. Example Result: Gadar, Koi Mil gaya, Dhoom 3, PK, Jersey";

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-001",
        contents: gptQuery,
      });

      const geminiMovies = response.text.split(",");
      const movieDataPromiseArray = geminiMovies.map(movie => fetchMovieDetails(movie));
      const tmdbResults = await Promise.all(movieDataPromiseArray);

      dispatch(addGeminiMovieResult(tmdbResults));
      dispatch(addGeminiMovieNames(geminiMovies));
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] py-10 sm:py-20">
      <div className="absolute inset-0 -z-10">
        
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-11/12 sm:w-4/5 md:w-2/3 lg:w-1/2 bg-transparent grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-0 rounded-xl z-10"
      >
        <input
          ref={searchText}
          type="text"
          className="px-4 py-3 m-2 sm:m-4 col-span-1 sm:col-span-9 rounded-xl"
          placeholder={lang[langKey].gptSearchPlaceHolder}
          disabled={isLoading}
        />
        <button
          onClick={handleGptSearchClick}
          className="bg-red-500 text-white rounded-xl px-4 py-3 m-2 sm:m-4 col-span-1 sm:col-span-3 w-full relative disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            </div>
          ) : (
            lang[langKey].search
          )}
        </button>
      </form>

      {/* Full screen loader overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-red-500 border-solid rounded-full animate-spin border-t-transparent"></div>
            <div className="w-16 h-16 border-4 border-red-400 border-dotted rounded-full animate-[spin_1s_linear_infinite_0.5s] absolute top-0 left-0"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GptSearchBar;