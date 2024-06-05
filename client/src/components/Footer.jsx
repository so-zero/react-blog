import React, { useContext } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <ul className="footer__lists">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create">Write</Link>
        </li>
        <li>&copy Blog.</li>
      </ul>
    </footer>
  );
}
