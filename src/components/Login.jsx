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
            dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
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
    <div className="min-h-screen relative">
      <Header />
      <div className="absolute inset-0">
        <img src={BG_IMG} alt="Background" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative z-10 mx-auto mt-24 md:mt-40 w-11/12 md:w-1/3 max-w-md bg-black bg-opacity-80 p-6 md:p-8 rounded-lg text-white"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={username}
            type="text"
            placeholder="Username"
            className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-white"
            required
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-white"
          required
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-white"
          required
        />
        {!isSignInForm && (
          <input
            ref={confirmPassword}
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-white"
            required
          />
        )}
        {errorMessage && (
          <p className="text-red-500 font-bold mb-4">{errorMessage}</p>
        )}
        <button
          onClick={handleButtonClick}
          className="w-full p-3 bg-red-700 rounded-lg text-white font-bold"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="mt-4 text-center">
          {isSignInForm ? (
            <span>
              New to Netflix?{" "}
              <span
                className="text-red-500 cursor-pointer"
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
                className="text-red-500 cursor-pointer"
                onClick={toggleSignInForm}
              >
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