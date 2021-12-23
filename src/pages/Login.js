import React, { useState } from "react";
import "../Styles/login.css";
import { motion } from "framer-motion";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import SyncLoader from "react-spinners/SyncLoader";

function Login() {
  const navigate=useNavigate()
  const [show, setShow] = useState(false);
  const [loading,setLoading]=useState(false)
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const loginUser = () => {
    const { email, password } = values;

    axios
      .post("https://socialmediabackend1.herokuapp.com/login", {
        email,
        password,
      })
      .then((res) => {
        setLoading(false)
        localStorage.setItem('token',res.data)
    navigate('/home')
    })
      .catch((e) => {
        setLoading(false)
        console.log(e)});
  };
  const signupUser = () => {
    const { username,email, password } = values;

    axios
      .post("https://socialmediabackend1.herokuapp.com/signup", {
        username,
        email,
        password,
      })
      .then((res) => {
        
        setLoading(false)
        console.log(res.data)})
      .catch((e) => {
        setLoading(false)
        console.log(e)});
  };

  const handleLogin = () => {
    setLoading(true)
    loginUser();
  };
  const handleSignup = () => {
    setLoading(true)
    signupUser();
  };














  return (
    <div className="containers">
      <p className="logo">SocialHub</p>
      {!show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.1, x: 100 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2, x: 0 }}
          className="login-container"
        >
          <p className="title">Login</p>
    

          <label for="email" className="label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <label for="password" className="label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="input"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <button  onClick={handleLogin}>{loading ?       <SyncLoader color='black'  size={10} /> :'Login'}</button>
          <p className="signup-link">
            Don't have an account ?
            <span onClick={() => setShow(true)}>Signup</span>
          </p>
        </motion.div>
      )}

      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.1, x: 100 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2, x: 0 }}
          className="login-container"
        >
          <p className="title">Signup</p>

          <label for="username" className="label">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="input"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
          <label for="email" className="label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <label for="password" className="label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="input"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <button onClick={handleSignup}>{loading ?       <SyncLoader color='black'  size={10} /> :'Signup'}</button>
        </motion.div>
      )}
    </div>
  );
}

export default Login;
