import React from 'react'
import "./ProfileScreen.css"
import Nav from "../Nav";
import { useSelector } from 'react-redux';
import { selectUser } from "../features/counter/userSlice.js";
import {auth} from "../firebase.js";
import PlansScreen from './PlansScreen.js';

function ProfileScreen() {
    const user = useSelector(selectUser);
  return (
    <div className='profileScreen'>
        <Nav/>
            <div className="profileScreen__body">
                <h1>Edit Profile</h1>
                <div className="profileScreen__info">
                    <img src="https://i.pinimg.com/474x/5b/50/e7/5b50e75d07c726d36f397f6359098f58.jpg" alt=""/>
                    <div className="profileScreen__details">
                        <h2>{user.email}</h2>
                        <div className="profileScreen__plans">
                            <br/>
                            <h3>Plans</h3>
                            <PlansScreen/>
                            <button onClick={() => auth.signOut()} className="profileScreen__signout">Sign Out</button>

                        </div>

                    </div>

                </div>

            </div>

    </div>
  )
}

export default ProfileScreen