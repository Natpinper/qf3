import React, { useEffect, useState } from "react";
import userService from "../services/User.service";
import { Link, useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import "../styles/UserDetailsPage.css"
import { FaLocationArrow } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

function UserDetailsPage(props) {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  const getOneUser = () => {
    userService
      .getOneUser(userId)
      .then((response) => {
        const oneUser = response.data;
        setUser(oneUser);
        console.log(oneUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOneUser();
  }, []);

  return (
    <div className="profile-layout">
      {user && (
        <>
        <div className="profile-picture-container">
        <img src={user.imageUrl} className="profile-picture"/>
        <h1 className="myName">{user.name}</h1>
          <h3 className="myLocation"><FaLocationArrow/> {user.location}</h3>
        </div>
          
          <div className="PostList">
            {user.posts &&
              user.posts.map((post) => (
                <PostCard
                  key={post._id}
                  user={post.user}
                  _id={post._id}
                  title={post.title}
                  description={post.description}
                  price={post.price}
                  service={post.service}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UserDetailsPage;
