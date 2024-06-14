import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { IoHome, IoCloseOutline } from "react-icons/io5";
import { FaCloud, FaPencilAlt } from "react-icons/fa";
import { RiBearSmileFill } from "react-icons/ri";
import { TbGiftCardFilled } from "react-icons/tb";
import { HiBars3BottomLeft } from "react-icons/hi2";

export default function Header() {
  const [isNavShowing, setIsNavShowing] = useState(
    window.innerWidth > 767 ? true : false
  );
  const { currentUser } = useContext(UserContext);

  const handleClick = () => {
    if (window.innerWidth < 767) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  };
  return (
    <nav>
      <div className="nav__container container">
        <Link to="/" className="nav__logo" onClick={handleClick}>
          <FaCloud className="nav__icon" />
          Blog
        </Link>
        {currentUser?.id && isNavShowing && (
          <ul className="nav__menu">
            <li>
              <Link to="/" onClick={handleClick}>
                <IoHome className="nav__icon" />
                Home
              </Link>
            </li>
            <li>
              <Link to="/create" onClick={handleClick}>
                <FaPencilAlt className="nav__icon" />
                Write
              </Link>
            </li>
            <li>
              <Link to={`/myPosts/${currentUser.id}`} onClick={handleClick}>
                <TbGiftCardFilled className="nav__icon" />
                My Post
              </Link>
            </li>
            <li>
              <Link to={`/profile/${currentUser.id}`} onClick={handleClick}>
                <RiBearSmileFill className="nav__icon" />
                {currentUser?.name}
              </Link>
            </li>
            <li>
              <Link to="/logout" className="btn__nav" onClick={handleClick}>
                Logout
              </Link>
            </li>
          </ul>
        )}
        {!currentUser?.id && isNavShowing && (
          <ul className="nav__menu">
            <li>
              <Link to="/login" className="login__nav" onClick={handleClick}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="btn__nav" onClick={handleClick}>
                Register
              </Link>
            </li>
          </ul>
        )}
        <button
          className="nav__toggle-btn"
          onClick={() => setIsNavShowing(!isNavShowing)}
        >
          {isNavShowing ? <IoCloseOutline /> : <HiBars3BottomLeft />}
        </button>
      </div>
    </nav>
  );
}
