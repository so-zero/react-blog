import React from "react";
import { Link } from "react-router-dom";

export default function PostCategories() {
  return (
    <section className="post__categories">
      <ul className="categories">
        <li>
          <Link to="/posts/categories/Daily">Daily</Link>
        </li>
        <li>
          <Link to="/posts/categories/Art">Art</Link>
        </li>
        <li>
          <Link to="/posts/categories/Education">Education</Link>
        </li>
        <li>
          <Link to="/posts/categories/Literature">Literature</Link>
        </li>
        <li>
          <Link to="/posts/categories/Entertainment">Entertainment</Link>
        </li>
        <li>
          <Link to="/posts/categories/Uncategorized">Uncategorized</Link>
        </li>
      </ul>
    </section>
  );
}
