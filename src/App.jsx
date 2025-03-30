import {Provider} from 'react-redux'
import React from 'react'
import Body from './components/Body'
import appStore from './utils/appStore'
function App() {
  return (
    <>

    <Provider store={appStore}>
      <Body/>
      </Provider>
    {/* <React.StrictMode> */}
    
    </>
  )
}

export default App
