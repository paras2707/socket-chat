import React, { useState } from "react";
import "./Join.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

let user;

const sendUser = () => {
  user = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
};

const Join = () => {
  const [name, setName] = useState("");

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>Socket Chat</h1>
        <input
          placeholder="Enter Your Name"
          type="text"
          id="joinInput"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Link onClick={(e) => (!name ? e.preventDefault() : null)} to="/chat">
          {" "}
          <button onClick={sendUser} className="joinBtn">
            Join
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
