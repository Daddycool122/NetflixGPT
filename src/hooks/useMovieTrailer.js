import { API_OPTIONS } from '../utils/constants'
import { addTrailerVideo } from '../utils/moviesSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
const useMovieTrailer = (movieId)=>{

      // fetch trailer video
    
    
    const dispatch = useDispatch()
    const trailer = useSelector((store) => store.movies.trailerVideo);
    const getMovieVideos= async()=>{
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS);
        const json = await data.json();
  
        const filteredVideosOfTypeTrailer = json.results.filter(video=> video.type==='Trailer');
        const trailer =filteredVideosOfTypeTrailer.length? filteredVideosOfTypeTrailer[0] : json.results[0];
        dispatch(addTrailerVideo(trailer))
        
    }
  
    useEffect(()=>{
      if(trailer==null){
       getMovieVideos()
      }
      
    },[])
}

export default useMovieTrailer;