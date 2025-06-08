import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import "./Nav.css";


function Nav() {
    const[show, handleShow]=useState(false); //use state is a way of defining variables in react (react hooks to rerender)
    const navigate =useNavigate();

    //hide the nav bar when scrolling
    const transitionNavBar = () => {
        if (window.scrollY > 100){
            handleShow(true);
        } else {
            handleShow(false)
        }
    }

    useEffect(() => { //react hook
        window.addEventListener("scroll", transitionNavBar)
        return() => window.removeEventListener("scroll", transitionNavBar)

    }, [])

    //netflix logo and avatar images
  return (
    <div className= {`nav ${show && "nav_black"}`}>
        <div className = "nav_contents">
            <img
                onClick={()=> navigate("/")}
                className="nav_logo"
                src ="https://loodibee.com/wp-content/uploads/Netflix-logo.png" //fix padding
                alt=""
            />

            <img
                onClick={()=> navigate("/profile")}
                className= "nav_avatar"
                src ="https://i.pinimg.com/474x/5b/50/e7/5b50e75d07c726d36f397f6359098f58.jpg" 
                alt=""
            />

        </div>
        

    </div>
  )
}

export default Nav;