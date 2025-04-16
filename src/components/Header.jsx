import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { addUser, removeUser } from '../utils/userSlice'
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { LOGO } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";

function Header() {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      console.log(error);
      navigate('/error')
    });
  }

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView())
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
        navigate('/browse');
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full px-4 md:px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between items-center">
      <img className="w-32 md:w-44" src={LOGO} alt="Logo" />
      {user && (
        <div className="flex items-center space-x-2 md:space-x-4 mt-2 md:mt-0">
          <button
            onClick={handleGptSearchClick}
            className="py-1 px-3 md:py-2 md:px-4 bg-purple-800 text-white rounded-xl text-sm md:text-base"
          >
            GPT Search
          </button>
          <img className="w-8 h-8 md:w-12 md:h-12 rounded" src={user.photoURL} alt="userIcon" />
          <button
            onClick={handleSignOut}
            className="font-bold text-white text-sm md:text-base"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export default Header