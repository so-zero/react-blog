import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

export default function DeletePost({ postId: id }) {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const handleClick = async () => {
    setIsLoading(true);
    const URL = `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`;
    try {
      const response = await axios.delete(URL, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        if (location.pathname === `/myPosts/${currentUser.id}`) {
          navigate(0);
        } else {
          navigate("/");
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Link className="btn" onClick={() => handleClick(id)}>
      Delete
    </Link>
  );
}
