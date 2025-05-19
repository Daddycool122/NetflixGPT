import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const useTopRatedMovies = ()=>{
      // Fetch Data from TMDB API and update store  
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);
  const getTopRatedMovies= async()=>{
         const data =  await fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', API_OPTIONS);
         const json = await data.json();
         dispatch(addTopRatedMovies(json.results));
         
  }

  useEffect(()=>{
    if(topRatedMovies==null){
      getTopRatedMovies();
    }
  },[])
 
}

export default useTopRatedMovies;