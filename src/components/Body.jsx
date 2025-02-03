import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from './Login'
import Browse from './Browse'
import { auth } from '../utils/firebase'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {addUser,removeUser} from '../utils/userSlice'
import { onAuthStateChanged } from "firebase/auth";


function Body() {
    const dispatch = useDispatch();
    const appRouter = createBrowserRouter([
      {
        path: "/",
        element:<Login/>
      },
      {
        path: "/browse",
        element:<Browse/>
      }
    ])

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in.
          // Redirect to browse page
          const {uid,email,displayName,photoURL} = user;
          dispatch(addUser({uid:uid,
                            email:email,
                            displayName:displayName,
                            photoURL:photoURL}));
        } else {
          // No user is signed in.
          // Redirect to login page
          dispatch(removeUser());
        }
      });
    },[])
  return (
    <div>
     <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body