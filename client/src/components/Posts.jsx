import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import Loading from "./Loading";
import axios from "axios";
import PostCategories from "./PostCategories";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      const URL = `${process.env.REACT_APP_BACKEND_URL}/posts`;

      try {
        const response = await axios.get(URL);
        setPosts(response?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="posts">
      <PostCategories />
      <h3 className="posts__text container">All Blog Posts</h3>
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
