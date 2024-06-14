import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/register`;

    try {
      const response = await axios.post(URL, data);
      await response.data;
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="register">
      <div className="container register__container">
        <h2>회원가입</h2>
        <form className="form" onSubmit={handleSubmit}>
          {error && <p className="form__error-message">{error}</p>}
          <div className="form__list">
            <label htmlFor="name" />
            <input
              id="name"
              type="text"
              placeholder="이름"
              name="name"
              value={data.name}
              onChange={handleChange}
              autoFocus
            />
          </div>

          <div className="form__list">
            <label htmlFor="email" />
            <input
              id="email"
              type="email"
              placeholder="이메일"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>

          <div className="form__list">
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

          <div className="form__list">
            <label htmlFor="confirmPassword" />
            <input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호 확인"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn register__btn">
            회원가입
          </button>
        </form>
        <p className="link">
          계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </div>
    </section>
  );
}
