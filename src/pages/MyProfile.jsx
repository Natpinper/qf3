import React, { useEffect, useState, useContext } from "react";
import ProfileComponent from "../components/ProfileComponent";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import userService from "../services/User.service";
import { AuthContext } from "../context/auth.context";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
import "../styles/userProfile.css"

const API_URL = import.meta.env.VITE_API_URL;
function MyProfile() {
  const { user, setUser, isLoggedIn, removeToken, logOut, authenticateUser } =
    useContext(AuthContext);
  const { userId, postId } = useParams();
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const getUser = (userId) => {
    userService
      .getOneUser(userId)
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  };
  const deleteUser = (userId) => {
    userService.deleteUser(userId).then(() => {
      logOut();
      navigate("/");
      alert("The user has been deleted");
    });
  };

  const submitDelete = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this user?",
      buttons: [
        {
          className: "button-confirm",
          label: "Yes",
          onClick: () => deleteUser(userId),
        },
        {
          className: "button-confirm",
          label: "No",
          onClick: () => {},
        },
      ],
      overlayClassName: "confirm-alert-overlay",
      className: "confirm-alert",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { imageUrl };
    userService.updateUser(userId,  requestBody ).
    then((response) => {
      authenticateUser();
      alert("Profile picture has been uploaded");
    })
    .catch((err)=>{
      console.log(err)
    })
  };
  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);
    axios
      .post(`${API_URL}/api/upload`, uploadData)
      .then((response) => {
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.data.fileUrl);
        console.log(response.data.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  useEffect(() => {
    getUser(userId);
  }, [userId]);

  return (
    <div className="My-Profile-container">
      <div className="user-details">
       <ProfileComponent
          id={user._id}
          name={user.name}
          email={user.email}
          password={user.password}
          location={user.location}
          posts={user.posts}
          imageUrl={user.imageUrl}
          handleFileUpload={handleFileUpload}
         handleSubmit={handleSubmit}
        submitDelete={submitDelete}
        />
      </div>
      
    </div>
  );
}

export default MyProfile;
