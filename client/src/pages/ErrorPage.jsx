import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="error-container container">
      <h1 className="error">404</h1>
      <p className="error-text">페이지를 찾을 수 없습니다.</p>
      <Link to="/" className="error-btn">
        Home
      </Link>
    </div>
  );
}
