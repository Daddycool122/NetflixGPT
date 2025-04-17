import {signOut} from "firebase/auth";
import {auth} from '../utils/firebase';
import {useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import {addUser,removeUser} from '../utils/userSlice'
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { LOGO } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";



function Header() {
  
  const navigate = useNavigate();
  const user = useSelector(store=>store.user);
  const dispatch = useDispatch();
  

  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      console.log(error);
      
      navigate('/error')
    });
  }

  const handleGptSearchClick = ()=>{
    // Toggle GPT Search
    dispatch(toggleGptSearchView())
  }

  useEffect(() => {
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        // Redirect to browse page
        const {uid,email,displayName,photoURL} = user;
        dispatch(addUser({uid:uid,
                          email:email,
                          displayName:displayName,
                          photoURL:photoURL}));
                          navigate('/browse');
      } else {
        // No user is signed in.
        // Redirect to login page
        dispatch(removeUser());
        navigate('/');
      }
    });

    //Unsubscribe when component unmounts
    return ()=> unsubscribe();
  },[])

  return (
    <div className="absolute flex justify-between w-screen px-8 py-2 bg-gradient-to-b from-black z-10">
      <img
      className="w-44"
      src={LOGO} alt="" />

      {user &&
       <div className="flex p-2 gap-2">
        <button 
        onClick={handleGptSearchClick} 
        className="py-2 mx-4 my-2 px-4 bg-purple-800 text-white rounded-xl">GPT Search</button>
        <img
        className="w-12 h-12 "
        src={user.photoURL} alt="userIcon" />

        <button
        onClick={handleSignOut}
        className=" font-bold text-white"
        >Sign Out</button>
      </div>}
    </div>
  )
}

export default Header