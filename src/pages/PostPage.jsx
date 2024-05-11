import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import postService from "../services/Post.service";
import { FaLocationArrow, FaHeart } from "react-icons/fa";
import "../styles/PostDetailPage.css";


const API_URL = import.meta.env.VITE_API_URL;

function PostPage(props) {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);

  function increaseRate() {
    setLiked(true);
    setCount((prevCount) => {
      return prevCount + 1;
      
    });
  }
  const getPost = () => {
    postService
      .getPost(postId)
      .then((response) => {
        const onePost = response.data;
        setPost(onePost);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="PostDetails">
      {post && (
        <>
        <h1 className="title-details">{post.title}</h1>
        <Link to={`/user/${post.user._id}`}><h2 className="user-name">{post.user.name}</h2></Link>
        <h2 className="category">{post.service.category}</h2>
        <h3 className="subcategory">{post.service.subcategory}</h3>
        <p className="description">{post.description}</p>
        <div className="location-container">
          <FaLocationArrow className="location-icon"></FaLocationArrow>
          <h3 className="location">{post.user.location}</h3>
        </div>
        <h3 className="price">{post.price} €/hour</h3>

          <button
            className={liked ? "button-like clicked" : "button-like"}
            onClick={increaseRate}
            disabled={liked}
          >
            <FaHeart></FaHeart>
            <span>Like</span>
          </button>
        </>
      )}
    </div>
  );
}

export default PostPage;


