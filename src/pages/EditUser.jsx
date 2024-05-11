import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userService from "../services/User.service";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import "../styles/CreatePost.css"

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
function EditUser() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const { user, setUser, authenticateUser } = useContext(AuthContext);
  const cityArray = locationArray.map((location) => location.city).sort();

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    userService
      .getOneUser(userId)
      .then((response) => {
        const oneUser = response.data;
        setName(oneUser.name);
        setLocation(oneUser.location);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, location };

    userService
      .updateUser(userId, requestBody)
      .then((response) => {
        authenticateUser();
        navigate(`/user/${userId}/profile`);
        alert("User´s details have been updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  return (
 
    <div className="Create-post-form-container">
    <h2 className="form-title">Edit user´s details</h2>
      <form onSubmit={handleFormSubmit} className="form-create">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="category-select">Location:</label>
        <select
          name="location"
          className="category-select"
          value={location}
          onChange={handleChange}
        >
          <option value="">Select your location</option>
          {cityArray.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        <button type="submit" className="submit-button">Update User</button>
      </form>
      <Link to={`/user/${userId}/profile`}>
        <button>Back to My Profile</button>
      </Link>
    </div>
   
  );
}

export default EditUser;
