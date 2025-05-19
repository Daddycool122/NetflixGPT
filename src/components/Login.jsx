import { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_IMG, USER_AVATAR } from '../utils/constants';

function Login() {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const username = useRef(null);
  const confirmPassword = useRef(null);

  const handleButtonClick = () => {
    const emailValue = email.current.value.trim();
    const passwordValue = password.current.value.trim();
    const usernameValue = username?.current?.value.trim();
    const confirmPasswordValue = confirmPassword?.current?.value.trim();

    const message = isSignInForm
      ? checkValidData(emailValue, passwordValue)
      : checkValidData(emailValue, passwordValue, usernameValue, confirmPasswordValue);

    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: username.current.value,
            photoURL: USER_AVATAR
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid, email, displayName, photoURL }));
          }).catch((error) => {
            setErrorMessage(error.message);
          });
        })
        .catch((error) => {
          setErrorMessage(`${error.message} ${error.code}`);
        });
    } else {
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {})
        .catch((error) => {
          setErrorMessage(`${error.message} ${error.code}`);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      
      <div className="flex-1 relative flex items-center justify-center px-4">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={BG_IMG} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative w-full md:w-1/3 max-w-md bg-black bg-opacity-80 p-6 md:p-8 rounded-lg text-white"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              ref={username}
              type="text"
              placeholder="Username"
              className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          )}

          <input
            ref={email}
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {!isSignInForm && (
            <input
              ref={confirmPassword}
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          )}

          {errorMessage && (
            <p className="text-red-500 font-bold mb-4">{errorMessage}</p>
          )}

          <button
            onClick={handleButtonClick}
            className="w-full p-3 bg-red-600 hover:bg-red-700 transition-colors rounded-lg text-white font-bold"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p className="mt-6 text-center text-gray-300">
            {isSignInForm ? (
              <span>
                New to Netflix?{" "}
                <span
                  className="text-red-500 cursor-pointer hover:underline"
                  onClick={toggleSignInForm}
                >
                  Sign up
                </span>{" "}
                now
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <span
                  className="text-red-500 cursor-pointer hover:underline"
                  onClick={toggleSignInForm}
                >
                  Sign in
                </span>
              </span>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;