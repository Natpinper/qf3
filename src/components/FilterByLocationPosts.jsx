import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import "../styles/HomePage.css"
import { FaUnderline } from "react-icons/fa";

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
 const API_URL = "https://quickfix-backend.adaptable.app";
function FilterByLocationPosts() {
  const [input, setInput] = useState("");
  const [location, setLocation] = useState("Barcelona");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const cityArray = locationArray.map((location) => location.city).sort();

  useEffect(() => {
    fetchData(location);
  }, []);

  const fetchData = (value) => {
    fetch(`${API_URL}/api/post/location`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json, "this line")
        const filteredPosts = json.filter((post) => {
          return (
            value &&
            post.user.location &&
            post.user.location.toLowerCase() === value.toLowerCase()
          );
        });
        
        setFilteredPosts(filteredPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(location);
  };
  const hasResults = filteredPosts.length > 0
  return (
    <div className="location-search">
      <form onSubmit={handleSubmit} className="location-input">
        <label htmlFor="location" className="location-title"><h2 style={{color:"#394726", fontSize: "16px"}}>FIND IN YOUR AREA</h2> </label>
        <div className="filterSelect">
        <select 
          name="location"
          className="location-select"
          value={location}
          onChange={handleChange}
        >
          <option value="">Select a location</option>
          {cityArray.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        <button type="submit" className="Filter-button">Filter</button>
        </div>
      </form>

      <div className="location-results">
      {hasResults ? (
        <div className="PostListResults" >
          {filteredPosts.map((post) => (
            <PostCard key={post._id} {...post} />
          ))}
        </div>
      ):(
        <p style={{textAlign:"center"}}>No results found.</p>
      )}
      </div>
       
    </div>
  );
}

export default FilterByLocationPosts;
