import React, { useEffect } from 'react';
import HomeScreen from "./screens/Homescreen.js"; 
import ProfileScreen from "./screens/ProfileScreen.js"; 
import './App.css';
import {auth} from "./firebase.js";

import{
  BrowserRouter as Router, Routes, Route} from "react-router-dom"
import LoginScreen from './screens/LoginScreen.js';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/counter/userSlice.js';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();


  useEffect(()=>{

    const unsubsribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
          //logged in
          dispatch(login({
            uid: userAuth.uid,
            email:userAuth.email //current user and email
          }));
      }
        else{
          //logged out
          dispatch(logout());
        }
    });
    return unsubsribe;
  },[dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen/>
        ): (
          <Routes>
            <Route exact path="/profile" element={<ProfileScreen />} />

          <Route exact path="/" element={<HomeScreen />} />
        </Routes>

        )}

    </Router>

    </div>
  );
}

export default App;

