import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        <img
          className="ui mini image"
          alt="Streamer logo"
          src="/Streamer-logo-1.jpg"
        />
        <div className="item">
          <h3>Streamer</h3>
        </div>
      </Link>
      <div className="right menu">
        <div className="item">
          <Link to="/" className="item">
            All Streams
          </Link>
          <GoogleAuth />
        </div>
      </div>
    </div>
  );
};

export default Header;
