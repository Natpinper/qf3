import React from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/PostCardUser.css"
function PostCardUser({ title, description, _id, service, price, userId }) {
 
  return (
    <div>
      <div >
        <Link to={`/user/${userId}/post/${_id}`} className="link-to-posts">
          <h4>{title}</h4>
        </Link>
      
      </div>
    </div>
  );
}

export default PostCardUser;
