import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import axios from "axios";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";

export default function CategoryPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { category } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      const URL = `${process.env.REACT_APP_BACKEND_URL}/posts/categories/${category}`;

      try {
        const response = await axios.get(URL);
        setPosts(response?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [category]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="posts">
      <div className="container posts__container">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            postId={post._id}
            thumbnail={post.thumbnail}
            category={post.category}
            title={post.title}
            description={post.description}
            authorId={post.creator}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </section>
  );
}
