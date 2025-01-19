import React from 'react'
import createBrowserRouter from 'react-router-dom'
import RouterProvier from 'react-router-dom'
import Header from './Header'
function Body() {
    const appRouter = createBrowserRouter([

    ])
  return (
    <div>
        <RouterProvier router={appRouter}>

        </RouterProvier>
    </div>
  )
}

export default Body