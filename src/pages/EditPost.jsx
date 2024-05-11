import React, { useEffect, useState } from 'react'
import postService from '../services/Post.service'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import "../styles/CreatePost.css"
const API_URL = import.meta.env.VITE_API_URL;
function EditPost() {

    const [title, setTitle] = useState("")
    const [service, setService] = useState([])
    const [allServices, setAllServices] = useState([])
    const [selectedService, setSelectedService] = useState([]);
    const [category, setCategory]= useState("");
    const [subcategory, setSubcategory] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)

    const allServicesArray = [
        "Childcare",
        "Pets",
        "Motoring",
        "Tuition & Classes",
        "Health & Beauty",
        "Property & Maintenance",
      ];

    const {postId, userId} = useParams()
    const navigate = useNavigate()


    useEffect(()=>{
      axios.get(`${API_URL}/api/services`).then((response) => {
        setAllServices(response.data);
        console.log(allServices)
      });

        postService.getPostFromUser(postId)
        .then((response)=>{
            const onePost = response.data
            setTitle(onePost.title)
            setDescription(onePost.description)
            setPrice(onePost.price)
            setSelectedService(onePost.service)
            setCategory(onePost.service.category)
            setSubcategory(onePost.service.subcategory)
            console.log(onePost.service.category)
            console.log(onePost.service.subcategory)
            console.log(onePost.service)
            
      
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [postId])

    function filterService(categoryParam) {
        const filteredService = allServices.filter((oneService) => {
          return oneService.category === categoryParam;
        });
    
        setService(filteredService);
      }
      function filterCategory(subcategory) {
        const filteredCategories = service.filter((oneSubcategory) => {
          return oneSubcategory.subcategory === subcategory;
        });
        setSelectedService(filteredCategories);
      }
    

    const handleFormSubmit = (e)=>{
        e.preventDefault()

        const requestBody = { 
          title,
          service: selectedService._id, 
          description, 
          price
        };

        postService.updatePost(postId, requestBody)
        .then((response)=>{
          navigate(`/user/${userId}/post/${postId}`)  
          alert("Post´s details have been updated")
        })
        .catch((error)=>{
            console.log(error)
        })
    }

  return (
    <div className="Create-post-form-container">
    <h2 className="form-title">Edit your post</h2>
      <form onSubmit={handleFormSubmit} className="form-create">
      <label>Title:</label>
      <input
        type="text"
        name="name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Description:</label>
      <textarea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Price:</label>
      <input
        placeholder="€/hour"
        type="number"
        name="price"
        min={0}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <label className="category-select">Select a category:</label>
      <select
          onChange={(e) => {
            filterService(e.target.value);
          }}
          name="category"
          className="category-select"
        >
          <option value="">Please choose a category</option>
          {allServicesArray.map((serviceOne) => {
            return (
              <option key={serviceOne} value={serviceOne}>
                {serviceOne}
              </option>
            );
          })}
        </select>
        <label className="subcategory-select">Select a subcategory:</label>
        <select
          onChange={(e) => {
            filterCategory(e.target.value);
          }}
          name="subcategory"
          className="subcategory-select"
        >
          <option value="">Please choose a subcategory</option>
          {service.map((oneChosenSub) => {
            return (
              <option
                key={oneChosenSub.subcategory}
                value={oneChosenSub.subcategory}
              >
                {oneChosenSub.subcategory}
              </option>
            );
          })}
        </select>
      <button type='submit' className="submit-button">Submit changes</button>
      </form>
      <Link to={`/user/${userId}/profile`}>
            <button>Back to My Profile</button>
            </Link>
    </div>
  )
}

export default EditPost
