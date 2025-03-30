import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';


const Browse = () => {

  useNowPlayingMovies();
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