import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PostCardUser from "./PostCardUser";
import "../styles/userProfile.css";


function ProfileComponent({
  name,
  email,
  password,
  location,
  posts,
  _id,
  imageUrl,
  handleSubmit,
  handleFileUpload,
  submitDelete,
}) {
  const { userId } = useParams();

  return (
<div className="profile-container">
<div className="profile-left">
      <div className="picture-and-details">
        <div className="profile-picture-container">
          <img src={imageUrl} className="profile-picture" />
          <form onSubmit={handleSubmit} className="profile-picture-submit">
            <input
              className="picture-input"
              type="file"
              onChange={(e) => {
                handleFileUpload(e);
              }}
            />
            <button type="submit" className="submit-picture-button">
              Upload picture
            </button>
          </form>
        </div>
        <div className="user-details">
          <h1 className="myName">{name}</h1>
          <h3 className="myEmail">email: {email}</h3>
          <h3 className="myLocation">Location: {location}</h3>
        </div>
      </div>
      <div className="all-buttons-user">
        <div className="User-buttons">
          <Link to={`/user/${userId}/post/create`}>
            <button>Create new post</button>
          </Link>
          <button onClick={submitDelete}>Delete User</button>
          <Link to={`/user/${userId}/profile/edit`}>
            <button>Edit user</button>
          </Link>
        </div>
      </div>
      </div>

      <div className="post-list-profile">
        <h3 className="myPosts">My Posts</h3>

        {posts &&
          posts.map((post) => (
            <PostCardUser
              key={post._id}
              userId={post.user._id}
              _id={post._id}
              title={post.title}
              description={post.description}
              price={post.price}
              service={post.service}
            />
          ))}
      </div>
      </div>
  
  );
}

export default ProfileComponent;
