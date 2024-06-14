import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export default function PostAuthor({ authorId, createdAt }) {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/users/${authorId}`;

      try {
        const response = await axios.get(URL);
        setAuthor(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthor();
  }, [authorId]);
  return (
    <div className="post__authors">
      <Link to={`posts/users/${authorId}`} className="post__author">
        <img
          src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`}
          alt="user profile"
        />
        <h5 className="post__author">{author?.name}</h5>
      </Link>
      <div className="post__author-details">
        <span>{moment(createdAt).fromNow()}</span>
      </div>
    </div>
  );
}
