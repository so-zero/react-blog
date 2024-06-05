import React, { useContext, useEffect, useState } from "react";
import { TbMoodEdit, TbMoodCheck } from "react-icons/tb";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserProfile() {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [isAvatarClick, setIsAvatarClick] = useState(false);
  const [error, setError] = useState("");

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/users/${currentUser.id}`;
      const response = await axios.get(URL, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      const { name, email, avatar } = response.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar);
    };
    getUser();
  }, []);

  const handleClick = async () => {
    setIsAvatarClick(false);
    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/change-avatar`;
    try {
      const postData = new FormData();
      postData.set("avatar", avatar);
      const response = await axios.post(URL, postData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvatar(response?.data?.avatar);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/edit-user`;

    try {
      const userData = new FormData();
      userData.set("name", name);
      userData.set("email", email);
      userData.set("currentPassword", currentPassword);
      userData.set("newPassword", newPassword);
      userData.set("newConfirmPassword", newConfirmPassword);

      const response = await axios.patch(URL, userData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        navigate("/logout");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <section className="profile">
      <div className="container profile__container">
        <h2>블로그 정보</h2>
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img
                src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                alt="Avatar"
              />
            </div>
            <form className="avatar__form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
                accept="png, jpg, jpeg"
              />
              <label htmlFor="avatar" onClick={() => setIsAvatarClick(true)}>
                <TbMoodEdit />
              </label>
            </form>
            {isAvatarClick && (
              <button className="profile__avatar-btn" onClick={handleClick}>
                <TbMoodCheck />
              </button>
            )}
          </div>
          <h3>{currentUser.name}</h3>

          <form
            action=""
            className="form profile__form"
            onSubmit={handleSubmit}
          >
            {error && <p className="form__error-message">{error}</p>}
            <input
              type="text"
              name="name"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="currentPassword"
              placeholder="기존 비밀번호"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              name="NewPassword"
              placeholder="새 비밀번호"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={newConfirmPassword}
              onChange={(e) => setNewConfirmPassword(e.target.value)}
            />
            <button type="submit" className="btn">
              업데이트
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
