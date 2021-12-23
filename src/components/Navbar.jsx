import React, { useEffect, useState } from "react";
import "../Styles/navbar.css";
// import Request from "../assets/request.svg";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import {useContext} from 'react';
import {Context} from '../Context';

function Navbar({pic}) {
  const {user}=useContext(Context);
    const navigate=useNavigate()
  const [show, setShow] = useState(false);
  

  const showNav = () => {
    const nav = document.getElementById("nav");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) {
        nav.classList.add("active");
      } else {
        nav.classList.remove("active");
      }
    });
  };
  useEffect(() => {
    showNav();
  });


  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate('/')
  }


  return (
    <>
      <div className="navbar" id="nav">
        <Link to="/home">
          <p className="logo">SocialHub</p>
        </Link>
        <div className="links">
      
          <Link to="/home">
            <a href="#!" className="link">
              Home
            </a>
          </Link>
          <a href="#!" className="link">
            Chats
          </a>
       

          <Link to="/profile">
            <a href="#!" className="link">
              Profile
            </a>
          </Link>

          <a onClick={() => setShow(true)} href="#!" className="link">
            <img
              src={user.pic}
              alt="avatar"
              className="avatar"
            />
          </a>
        </div>
      </div>
      {show && (
        <div className="logout-modal" >
          <p onClick={handleLogout} className="logout">logout</p>
        </div>
      )}


 
    </>
  );
}

export default Navbar;
