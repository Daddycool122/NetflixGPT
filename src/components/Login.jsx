import { useState } from 'react'
import Header from './Header'
function Login() {
  const [isSignInForm,setIsSignInForm]= useState(true);
  const toggleSignInForm=()=>{
    setIsSignInForm(!isSignInForm);
  }
  return (
    <div className="">
      <Header/>

      <div className='absolute'>
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/e3e9c31f-aa15-4a8f-8059-04f01e6b8629/web/IN-en-20250113-TRIFECTA-perspective_febfa442-23d9-45f3-937e-72f8b971f7a9_large.jpg" alt="" />
      </div>

      {isSignInForm?
      <form className='absolute rounded-lg my-40 mx-auto right-0 left-0 p-14 text-white bg-opacity-80 bg-black w-3/12 '>

      <h1 className='p-1 m-1 text-white font-bold text-2xl'>{isSignInForm?"Sign in":"Sign up"}</h1>

      <input 
      type="email" 
      placeholder="Email" 
      className="p-4 my-4 w-full bg-gray-700 rounded-lg" />

      <input 
      type="password" 
      placeholder="Password" 
      className="p-4 my-4 w-full bg-gray-700 rounded-lg" />

      <button 
      className='p-2 my-6 bg-red-700 border border-r w-full rounded-lg'>Sign in</button>

      <p className='mx-2'>New to Netflix? 
      <span className='cursor-pointer text-blue-500' onClick={toggleSignInForm}> Sign Up </span>
      now.</p>

    </form>
    :
    <form className='absolute rounded-lg my-40 mx-auto right-0 left-0 p-14 text-white bg-opacity-80 bg-black w-3/12 '>
        <h1 className='p-1 m-1 text-white font-bold text-2xl'>{isSignInForm?"Sign in":"Sign up"}</h1>

        <input 
        type="text" 
        placeholder="Username" 
        className="p-4 my-4 w-full bg-gray-700 rounded-lg" />

        <input 
        type="email" 
        placeholder="Email" 
        className="p-4 my-4 w-full bg-gray-700 rounded-lg" />

        <input 
        type="password" 
        placeholder="Password" 
        className="p-4 my-4 w-full bg-gray-700 rounded-lg" />

<input 
        type="password" 
        placeholder="Confirm Password" 
        className="p-4 my-4 w-full bg-gray-700 rounded-lg" />

        <button 
        className='p-2 my-6 bg-red-700 border border-r w-full rounded-lg'>Sign up</button>

        <p className='mx-2 r' >Already have an account? 
        <span className='cursor-pointer text-blue-500' 
        onClick={toggleSignInForm}>Sign in</span>.</p>
      </form>
      }
    </div>
  )
}

export default Login