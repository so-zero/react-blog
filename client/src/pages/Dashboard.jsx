import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import Loading from "../components/Loading";
import DeletePost from "./DeletePost";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const URL = `${process.env.REACT_APP_BACKEND_URL}/posts/users/${id}`;

      try {
        const response = await axios.get(URL, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [token, id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="dashboard">
      {posts.length ? (
        <div className="container dashboard__container">
          {posts.map((post) => {
            return (
              <article key={post._id} className="dashboard__post">
                <div className="dashboard__post-info">
                  <div className="dashboard__post-thumbnail">
                    <img
                      src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post?.thumbnail}`}
                      alt="Thumbnail"
                    />
                  </div>
                  <h4>{post.title}</h4>
                </div>
                <div className="dashboard__post-actions">
                  <Link to={`/posts/${post?._id}`} className="btn">
                    View
                  </Link>
                  <Link to={`/posts/${post?._id}/edit`} className="btn">
                    Edit
                  </Link>
                  <DeletePost postId={post?._id} />
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <h2 className="center">작성된 게시글이 없습니다.</h2>
      )}
    </section>
  );
}
