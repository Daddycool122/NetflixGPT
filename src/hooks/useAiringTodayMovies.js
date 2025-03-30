import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addAiringTodayMovies, addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useAiringTodayMovies = ()=>{
      // Fetch Data from TMDB API and update store  
  const dispatch = useDispatch();

  const getAiringTodayMovies= async()=>{
         const data =  await fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', API_OPTIONS);
         const json = await data.json();
         dispatch(addAiringTodayMovies(json.results));
         
  }

  useEffect(()=>{
    getAiringTodayMovies();
  },[])
 
}

export default useAiringTodayMovies;