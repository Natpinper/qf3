import React, { useState } from 'react'
import { useEffect } from 'react';

const subcategoriesByCategory = {
    Childcare: ["Nannies", "Babysitting"],
    Pets: ["Petsitting", "Training", "Vets"],
    "Property and Maintenance": ["Cleaners", "Housekeepers", "Interior Design", "TV & Internet connection" , "Plumber",  "Carpenter", "Electrician",  "Rubbish removal", "House renovation",  "Gardener" , "Painter" ],
    "Health and Beauty": ["Massages", "Hairdressing", "Beauty treatments","Personal trainer","Make Up Artist",  "Nail care","Nutrition" ],
    Motoring: ["Car repair and Mechanical services","Car wash", "MOT Testing"],
    "Tuition and Classes": ["Music", "Driving lessons", "Academic"]
}
const locationArray = [
  { city: "Almería", region: "Andalusia" },
  { city: "Cádiz", region: "Andalusia" },
  { city: "Córdoba", region: "Andalusia" },
  { city: "Granada", region: "Andalusia" },
  { city: "Huelva", region: "Andalusia" },
  { city: "Jaén", region: "Andalusia" },
  { city: "Málaga", region: "Andalusia" },
  { city: "Seville", region: "Andalusia" },
  { city: "Huesca", region: "Aragon" },
  { city: "Teruel", region: "Aragon" },
  { city: "Zaragoza", region: "Aragon" },
  { city: "Oviedo", region: "Asturias" },
  { city: "Formentera", region: "Balearic Islands" },
  { city: "Ibiza", region: "Balearic Islands" },
  { city: "Majorca", region: "Balearic Islands" },
  { city: "Minorca", region: "Balearic Islands" },
  { city: "Álava", region: "Basque Country" },
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
  { city: "Ávila", region: "Castile and León" },
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
  { city: "Melilla", region: "Melilla" }
];



function FilterHomePage() {
    const[category, setCategory]= useState("")
    const [subcategory, setSubcategory]= useState("")
    const [location, setLocation] = useState([])
    const [posts, setPosts] = useState([])

    const cityArray = locationArray.map(location => location.city);

    function populateSubcategories(e){
        const selectedCategory = e.target.value
        setCategory(selectedCategory)
        if (subcategoriesByCategory[selectedCategory]){
            setSubcategory('')
        } 
    }

    async function handleSubmit(event) {
        event.preventDefault();
    
        try{
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category, subcategory, location })
          };
          const response = await fetch(`/filtered-post`, requestOptions);
          const filteredPosts = await response.json();
          setPosts(filteredPosts)
        } catch (error) {
          console.error(error);
        }
      }

      useEffect(() => {
        handleSubmit();

      }, [category, subcategory, location]);

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="category">Category:</label>
      <select name="category" id="category" value={category} onChange={populateSubcategories}>
        <option value="">Select a category</option>
        {Object.keys(subcategoriesByCategory).map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      <label htmlFor="subcategory">Subcategory:</label>
      <select name="subcategory" id="subcategory" value={subcategory} onChange={(event) => setSubcategory(event.target.value)}>
        <option value="">Select a subcategory</option>
        {subcategoriesByCategory[category] && subcategoriesByCategory[category].map((subcategory) => (
          <option key={subcategory} value={subcategory}>{subcategory}</option>
        ))}
      </select>

      <label htmlFor="location">Location:</label>
      <select name='location' className='location-select' value={location} onChange={(event)=>setLocation(event.target.value)}>
      <option value="">Select a location</option>
      {cityArray.map((location, index)=>(
        <option key={index} value={location}>{location}</option>
      ))
      }
        
      </select>

      <button type="submit">Filter</button>
    </form>
    </div>
    )
}

export default FilterHomePage

