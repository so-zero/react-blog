import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/login`;

    try {
      const response = await axios.post(URL, data);
      const user = await response.data;
      setCurrentUser(user);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="login">
      <div className="container login-container">
        <h2>로그인</h2>
        <form className="form" onSubmit={handleSubmit}>
          {error && <p className="form__error-message">{error}</p>}

          <div className="form-list">
            <label htmlFor="email" />
            <input
              id="email"
              type="email"
              placeholder="이메일"
              name="email"
              value={data.email}
              onChange={handleChange}
              autoFocus
            />
          </div>

          <div className="form-list">
            <label htmlFor="password" />
            <input
              id="password"
              type="password"
              placeholder="비밀번호"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn login-btn">
            로그인
          </button>
        </form>
        <p className="link">
          계정이 없으신가요? <Link to="/register">회원가입</Link>
        </p>
      </div>
    </section>
  );
}
