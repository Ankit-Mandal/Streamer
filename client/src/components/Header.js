import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        <img alt="Streamer logo" src="/Streamer-logo.jpg" />
        <div className="item">Streamer</div>
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
