import React, { useContext, useEffect, useState } from "react";
import PostAuthor from "../components/PostAuthor";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import DeletePost from "./DeletePost";
import Loading from "../components/Loading";
import axios from "axios";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      const URL = `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`;

      try {
        const response = await axios.get(URL);
        setPost(response.data);
      } catch (error) {
        setError(error.response.data.message);
      }
      setIsLoading(false);
    };
    getPost();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="post__detail">
      {error && (
        <p p className="form__error-message">
          {error}
        </p>
      )}
      {post && (
        <div className="container post__detail-container">
          <div className="post__detail-header">
            <PostAuthor authorId={post.creator} createdAt={post.createdAt} />
            {currentUser?.id === post?.creator && (
              <div className="post__detail-btn">
                <Link to={`/posts/${post?._id}/edit`} className="btn btn__edit">
                  Edit
                </Link>
                <DeletePost postId={id} />
              </div>
            )}
          </div>
          <h1>{post?.title}</h1>
          <div className="post__detail-thumbnail">
            <img
              src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post?.thumbnail}`}
              alt="Thumbnail"
            />
          </div>
          <p dangerouslySetInnerHTML={{ __html: post?.description }}></p>
        </div>
      )}
    </section>
  );
}
