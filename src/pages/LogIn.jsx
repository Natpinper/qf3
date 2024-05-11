import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";
import "../styles/LoginPage.css"

const API_URL = import.meta.env.VITE_API_URL;
function LogIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);


  const navigate = useNavigate();

  const {storeToken, authenticateUser} = useContext(AuthContext)

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLogin = (e) => {
    e.preventDefault()
    const requestBody = { email, password }

    authService.login(requestBody)
    .then((response)=>{
      console.log('JWT token', response.data.authToken )
      storeToken(response.data.authToken)
      authenticateUser()
      navigate("/")
    })
    .catch((error)=>{
      const errorDescription = error.response.data.message
      setErrorMessage(errorDescription)
    })
  };

  return (
    <div className="LoginPageContainer">
      <h1 className="form-title">Login</h1>

      <form onSubmit={handleLogin} className="Login-Form">
        <label>Email:</label>
        <input required="true" type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input required="true" type="password" name="password" value={password} onChange={handlePassword} />

        <button type="submit" className="login-button">Login</button>
      </form>

      {errorMessage && <p className="error-message" style={{color:"red"}}>{errorMessage}</p>}

      <p className="signup-p">Don´t have an account yet?</p>
      <Link className="link-login" to={"/signup"}>Sign Up</Link>

    </div>
  );
}

export default LogIn;
