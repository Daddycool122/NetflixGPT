import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import Header from './Header'
import usePopularMovies from '../hooks/usePopularMovies'
import useAiringTodayMovies from '../hooks/useAiringTodayMovies'
import useTopRatedMovies from '../hooks/useTopRatedMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import GptSearch from './GptSearch'
import { useSelector } from 'react-redux'

const Browse = () => {
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useAiringTodayMovies();
  useTopRatedMovies();
  return (
    <div className="min-h-screen ">
      <Header />
      {showGptSearch?<GptSearch  />:
      <>
      <MainContainer />
      <SecondaryContainer />
      </>
      }
      
    </div>
  )
}

export default Browse;