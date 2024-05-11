import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import authService from "../services/auth.service";
import "../styles/SignupPage.css";
import "../styles/LoginPage.css";

const locationArray = [
  { city: "Almería", region: "Andalusia" },
  { city: "Cádiz", region: "Andalusia" },
  { city: "Córdoba", region: "Andalusia" },
  { city: "Granada", region: "Andalusia" },
  { city: "Huelva", region: "Andalusia" },
  { city: "Jaén", region: "Andalusia" },
  { city: "Málaga", region: "Andalusia" },
  { city: "Sevilla", region: "Andalusia" },
  { city: "Huesca", region: "Aragon" },
  { city: "Teruel", region: "Aragon" },
  { city: "Zaragoza", region: "Aragon" },
  { city: "Oviedo", region: "Asturias" },
  { city: "Formentera", region: "Balearic Islands" },
  { city: "Ibiza", region: "Balearic Islands" },
  { city: "Majorca", region: "Balearic Islands" },
  { city: "Minorca", region: "Balearic Islands" },
  { city: "Alava", region: "Basque Country" },
  { city: "Biscay", region: "Basque Country" },
  { city: "Gipuzkoa", region: "Basque Country" },
  { city: "Las Palmas", region: "Canary Islands" },
  { city: "Fuerteventura", region: "Canary Islands" },
  { city: "Gran Canaria", region: "Canary Islands" },
  { city: "Lanzarote", region: "Canary Islands" },
  { city: "Santa Cruz de Tenerife", region: "Canary Islands" },
  { city: "La Gomera", region: "Canary Islands" },
  { city: "La Palma", region: "Canary Islands" },
  { city: "Tenerife", region: "Canary Islands" },
  { city: "Santander", region: "Cantabria" },
  { city: "Avila", region: "Castile and León" },
  { city: "Burgos", region: "Castile and León" },
  { city: "León", region: "Castile and León" },
  { city: "Palencia", region: "Castile and León" },
  { city: "Salamanca", region: "Castile and León" },
  { city: "Segovia", region: "Castile and León" },
  { city: "Soria", region: "Castile and León" },
  { city: "Valladolid", region: "Castile and León" },
  { city: "Zamora", region: "Castile and León" },
  { city: "Albacete", region: "Castilla-La Mancha" },
  { city: "Ciudad Real", region: "Castilla-La Mancha" },
  { city: "Cuenca", region: "Castilla-La Mancha" },
  { city: "Guadalajara", region: "Castilla-La Mancha" },
  { city: "Toledo", region: "Castilla-La Mancha" },
  { city: "Barcelona", region: "Catalonia" },
  { city: "Girona", region: "Catalonia" },
  { city: "Lleida", region: "Catalonia" },
  { city: "Tarragona", region: "Catalonia" },
  { city: "Badajoz", region: "Extremadura" },
  { city: "Cáceres", region: "Extremadura" },
  { city: "A Coruña", region: "Galicia" },
  { city: "Lugo", region: "Galicia" },
  { city: "Ourense", region: "Galicia" },
  { city: "Pontevedra", region: "Galicia" },
  { city: "Logroño", region: "La Rioja" },
  { city: "Madrid", region: "Community of Madrid" },
  { city: "Murcia", region: "Region of Murcia" },
  { city: "Pamplona", region: "Navarre" },
  { city: "Alicante", region: "Valencian Community" },
  { city: "Castellón", region: "Valencian Community" },
  { city: "Valencia", region: "Valencian Community" },
  { city: "Ceuta", region: "Ceuta" },
  { city: "Melilla", region: "Melilla" },
];

function SignUpPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const cityArray = locationArray.map((location) => location.city).sort();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleRepeatPassword = (e) => setRepeatPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleLocation = (e) => setLocation(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const requestBody = { email, password, name, location };

    authService
      .signup(requestBody)
      .then((response) => {
        navigate("/login");
        console.log(response);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupContainer">
      <h1 className="form-title">Sign Up</h1>

      <form className="Login-Form" onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input
          required={true}
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />

        <label>Password:</label>
        <input
          required={true}
          minLength={6}
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <label>Repeat Password:</label>
        <input
          required={true}
          minLength={6}
          type="password"
          name="repeatPassword"
          value={repeatPassword}
          onChange={handleRepeatPassword}
        />

        <label>Name:</label>
        <input
          required={true}
          type="text"
          name="name"
          value={name}
          onChange={handleName}
        />
        <div className="location-signup">
          <label>Location: </label>
          <select
            name="location"
            className="location-select"
            required={true}
            value={location}
            onChange={handleLocation}
          >
            <option value="">Select a location</option>
            {cityArray.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <button className="signup-button" type="submit">
          Sign Up
        </button>
      </form>
      {errorMessage && <p className="error-message" style={{color:"red"}}>{errorMessage}</p>}
      <div className="lowest-p">
        <p>Already have account?</p>
        <Link className="link-signup" to={"/login"}>
          Login
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;

//authService.signup(requestBody)
