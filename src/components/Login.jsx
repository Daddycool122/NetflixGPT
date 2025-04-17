import { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_IMG, USER_AVATAR } from '../utils/constants';

function Login() {
  const [isSignInForm,setIsSignInForm]= useState(true);
  const [errorMessage,setErrorMessage]= useState(null);

  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const username = useRef(null);
  const confirmPassword = useRef(null);


  const handleButtonClick = () => {
    const emailValue = email.current.value.trim();
    const passwordValue = password.current.value.trim();
    const usernameValue = username?.current?.value.trim() ;
    const confirmPasswordValue = confirmPassword?.current?.value.trim() ;
  
    const message = isSignInForm
      ? checkValidData(emailValue, passwordValue) // For "Sign In"
      : checkValidData(emailValue, passwordValue, usernameValue, confirmPasswordValue); // For "Sign Up"
  
    setErrorMessage(message); // Display the error message, if any

    
    if(message) return;
    
    
      // Add actual sign-in/sign-up logic here
      if(!isSignInForm){
        console.log("Sign up");
        createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
      // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: username.current.value, photoURL: USER_AVATAR
        }).then(() => {
          // Profile updated!
          // ...
          const {uid,email,displayName,photoURL} = auth.currentUser;
                    dispatch(addUser({uid:uid,
                                      email:email,
                                      displayName:displayName,
                                      photoURL:photoURL}));
          
        }).catch((error) => {
          // An error occurred
          // ...
          setErrorMessage(error.message);
        });
        console.log(user);
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage+" "+errorCode);
    
    // ..
  });
      }
      else{
        console.log("Sign in");
        signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // ...
  })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage+" "+errorCode);

  });
      }

    
  };
  

  const toggleSignInForm=()=>{
    
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null)
  }
  return (
    <div className="">
      <Header/>
      <div className='absolute'>
      <img src={BG_IMG} alt="" />
      </div>


      <form onSubmit={(e)=>{e.preventDefault()}} className='absolute rounded-lg my-40 mx-auto right-0 left-0 p-[18px] text-white bg-opacity-80 bg-black w-3/12 '>

      <h1 className='p-1 m-1 text-white font-bold text-2xl'>{isSignInForm?"Sign in":"Sign up"}</h1>

      {
        !isSignInForm && (
          <input ref={username} 
          type="text" 
          placeholder="Username" 
          className="p-4 my-4 w-full bg-gray-700 rounded-lg" required />
        )
      }

      <input 
      ref={email}
      type="text" 
      placeholder="Email" 
      className="p-4 my-4 w-full bg-gray-700 rounded-lg" required/>

      <input 
      ref={password}
      type="password" 
      placeholder="Password" 
      className="p-4 my-4 w-full bg-gray-700 rounded-lg" required />

      {
        !isSignInForm && (
          <input ref={confirmPassword}
          type="password" 
          placeholder="Confirm Password" 
          className="p-4 my-4 w-full bg-gray-700 rounded-lg" required />
        )
      }

      <p className='text-red-500 font-bold'>{errorMessage}</p>

      <button 
      onClick={handleButtonClick}
      className='p-2 my-6 bg-red-700 border border-r w-full rounded-lg'>{isSignInForm?"Sign in":"Sign up"}</button>

<p className='mx-2'> 
  {isSignInForm ? (
    <span>
      New to Netflix?{" "}
      <span className='text-red-500  cursor-pointer' onClick={toggleSignInForm}>
        Sign up {" "}
      </span>
      now
    </span>
  ) : (
    <span>
      Already have an account?{" "}
      <span className='text-red-500  cursor-pointer' onClick={toggleSignInForm}>
        Sign in
      </span>
    </span>
  )}
</p>


    </form>
    
      
    </div>
  )
}

export default Login