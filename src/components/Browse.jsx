import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import Header from './Header'
const Browse = () => {
  const getNowPlayingMovies= async()=>{
         const data =  await fetch('https://api.themoviedb.org/3/movie/now_playing?', API_OPTIONS);
         const json = await data.json();
         console.log(json);
         
  }

  useEffect(()=>{
    getNowPlayingMovies();
  },[])
 

  return (
    <div className=''>
      <Header />
    </div>
  )
}

export default Browse