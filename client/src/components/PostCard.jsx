import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";

export default function PostCard({
  postId,
  thumbnail,
  category,
  title,
  description,
  authorId,
  createdAt,
}) {
  const desc =
    description.length > 45 ? description.substr(0, 45) + "..." : description;
  const postTitle = title.length > 20 ? title.substr(0, 20) + "..." : title;
  return (
    <article className="post">
      <div className="post__thumbnail">
        <img
          src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`}
          alt={title}
        />
      </div>
      <div className="post__content">
        <div>
          <PostAuthor authorId={authorId} createdAt={createdAt} />
        </div>
        <Link to={`posts/${postId}`}>
          <h3 className="post__title">{postTitle}</h3>
        </Link>
        <p className="post__desc" dangerouslySetInnerHTML={{ __html: desc }} />
      </div>
      <div className="post__content-group">
        <Link to={`/posts/categories/${category}`} className="post__category">
          {category}
        </Link>
        <Link to={`posts/${postId}`} className="post__btn">
          Continue reading
        </Link>
      </div>
    </article>
  );
}
