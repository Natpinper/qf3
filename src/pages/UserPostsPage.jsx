import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import postService from "../services/Post.service";
import { Link } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa";
import "../styles/PostDetailPage.css";
import "../styles/deletePostUserPage.css"
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import "../services/Post.service";
import { confirmAlert } from "react-confirm-alert";

const API_URL = import.meta.env.VITE_API_URL;

function UserPostsPage(props) {
  const [post, setPost] = useState(null);

  const { postId, userId } = useParams();
  const { user, authenticateUser, storeToken } = useContext(AuthContext);

  const navigate = useNavigate()
  console.log(user, " THis is the USER ID");
  const getPost = () => {
    postService
      .getPostFromUser(postId)
      .then((response) => {
        const onePost = response.data;
        setPost(onePost);
        console.log(response.data);
        console.log(postId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postId)=>{
    postService.deletePost(postId).then(()=>{
      navigate(`/${userId}/profile`)
      alert("The post has been deleted");
    })
  }

  const submitDelete = ()=>{
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this post?",
      buttons: [
        {
          className:"button-confirm",
          label: "Yes",
          onClick:()=> deletePost(postId)
        },
        {
          className:"button-confirm",
          label: "No",
          onClick:()=>{}
        }
      ]
    })
  }
  useEffect(() => {
    getPost(postId);
  }, [postId]);

  return (
    <div className="PostDetails">
      {post && (
        <>
          <h1 className="title-details">{post.title}</h1>
          <h2 className="category">{post.service.category}</h2>
          <h3 className="subcategory">{post.service.subcategory}</h3>
          <p className="description">{post.description}</p>
          <h3 className="location"></h3>
          <h3 className="price">{post.price} €/hour</h3>
          <div className="submit-button-post">
          {user._id === post.user._id && <button className="specific-button" onClick={submitDelete}>Delete Post</button>}
          {user._id === post.user._id && 
            <Link to={`/user/${userId}/post/${postId}/edit`}>
            <button className="specific-button">Edit Post</button>
            </Link>}
            </div>
        </>
      )}
    </div>
  );
}

export default UserPostsPage;
