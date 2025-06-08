import React, { useState } from 'react'
import './LoginScreen.css'
import SignupScreen from './SignUpScreen';


function LoginScreen() {
    const [signIn, setSignIn]= useState(false);

    //use hooks for when a user logs in
  return (
    <div className="loginScreen">
        
       <div className="loginScreen__background"> 
      
            <img className="loginScreen__logo" src="https://loodibee.com/wp-content/uploads/Netflix-logo.png" alt=""/>
            <button onClick={() => setSignIn(true)} className="loginScreen__button">
                Sign In
            </button>
            <div className="loginScreen__gradient"/>
            
       </div>

       <div className="loginScreen__body">
        {signIn ? (<SignupScreen/>
        ): ( 
            <>
            <h1> Unlimited films, TV programmes and more</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>Ready to watch? Enter your email address or restart your membership.</h3>

            <div className="loginScreen__input">
                {/*For user to sign up or register(will take them to signuo screen)*/}
                <form>
                    <input type="email" placeholder="Email Address"/>
                    <button 
                    onClick={() => setSignIn(true)} 
                    className="loginScreen_getStarted">GET STARTED</button>
                </form>
            </div>

        </>
        )}
       </div>

    </div>
  )
  //https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png
  //https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1PPF0za8pIgRt3StW4BWgHtDKQ7Z6CQRihA&s
}

export default LoginScreen