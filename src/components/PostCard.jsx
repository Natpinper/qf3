import React from "react";
import { Link } from "react-router-dom";
import "../styles/PostCard.css";
import { FaLocationArrow,  } from "react-icons/fa";

function PostCard({ title, description, _id, price, user={_id}, service={_id}}) {
  return (
    <div className="Post-Card">
      
      <Link className="link" to={`/post/${_id}`}>
        <h1 className="title">{title}</h1>
      </Link>
      <Link className="link" to={`/user/${user._id}`}>
        <h2 className="user-name">{user.name}</h2>
      </Link>
      <h2 className="category">{service.category}</h2>
      <h3 className="subcategory">{service.subcategory}</h3>
      <p className="description">{description}</p>
      <div className="location-container">
        <FaLocationArrow className="location-icon"></FaLocationArrow>
        <h3 className="location">{user.location}</h3>
      </div>
      <h3 className="price">{price} €/hour</h3>
    </div>
  );
}

export default PostCard;