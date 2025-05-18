import React, { useRef } from "react";
import { API_OPTIONS, BG_IMG } from "../utils/constants";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import { ai } from "../utils/openai";
import { useDispatch } from "react-redux";
import { addGeminiMovieResult , addGeminiMovieNames} from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  // search movie in tmdb
  const fetchMovieDetails = async (movieName) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_language=en-US&page=1`,
      API_OPTIONS
    );

    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    // Make an API call to GPT API to get the movie results

    const gptQuery =
      "Act as a movie recommendation engine. Recommend me 5 comma separated movies based on the following query: " +
      searchText.current.value +
      ". like the example result giveh ahead. Example Result: Gadar, Koi Mil gaya, Dhoom 3, PK, Jersey";
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: gptQuery,
    });
    //console.log(response.text);

    const geminiMovies = response.text.split(",");
    
    // for each movie, get the movie details from TMDB API
    const movieDataPromiseArray = geminiMovies.map(movie => fetchMovieDetails(movie))
    //Output:  [Promise, Promise, Promise, Promise, Promise]
    

    // wait for all promises to resolve
    const tmdbResults = await Promise.all(movieDataPromiseArray)
    console.log(tmdbResults)

    dispatch(addGeminiMovieResult(tmdbResults))
    dispatch(addGeminiMovieNames(geminiMovies))
    
    
  };
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] py-10 sm:py-20">
      <div className="absolute inset-0 -z-10">
        <img
          src={BG_IMG}
          alt="Background"
          className="w-full h-full object-cover"
        />
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
        />
        <button
          onClick={handleGptSearchClick}
          className="bg-red-500 text-white rounded-xl px-4 py-3 m-2 sm:m-4 col-span-1 sm:col-span-3 w-full"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
