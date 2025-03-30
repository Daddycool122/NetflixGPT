import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import Header from './Header'
import usePopularMovies from '../hooks/usePopularMovies'
import useAiringTodayMovies from '../hooks/useAiringTodayMovies'
import useTopRatedMovies from '../hooks/useTopRatedMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';


const Browse = () => {

  useNowPlayingMovies();
  usePopularMovies();
  useAiringTodayMovies();
  useTopRatedMovies();
  return (
    <div className=''>
      <Header />
      <MainContainer/>
      <SecondaryContainer/>
      {/*
        Main Container
          - VideoBackground
          - VideoTitle
        SecondaryContainer
          - MoviesList * n
          - cards * n
      
      */}
    </div>
  )
}

export default Browse;