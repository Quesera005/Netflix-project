import React, { useRef } from 'react';
import './SignupScreen.css';
import { auth } from "../firebase"; // Import the initialized auth

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function SignupScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();

    // Register a new user with email and password
    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((authUser) => {
        console.log(authUser);  // Log the user data
      })
      .catch((error) => {
        alert(error.message);  // Display error message
      });
  };

  const signIn = (e) => {
    e.preventDefault();

    // Sign in with email and password
    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((authUser) => {
        console.log(authUser);  // Log the user data
      })
      .catch((error) => {
        alert(error.message);  // Display error message
      });
  };

  return (
    <div className="SignupScreen">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="Password" type="password" />
        <button onClick={signIn} type="submit">
          Sign In
        </button>
        <h4>
          <span className="signupScreen__grey">New to Netflix? </span>
          <span className="signupScreen__link" onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignupScreen;
