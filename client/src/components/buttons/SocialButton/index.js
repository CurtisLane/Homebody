import React, { Component } from "react";
import API from "../../../utils/API";
// import style from "./style.css";
const SocialButton = (props) => {
  const googleClick = () => {
    API.googleLogin();
  };
  const facebookClick = () => {
    API.facebookLogin();
  };
  return (
    <div className="text-center social-btn">
      <button
        onClick={props.provider === "google" ? googleClick : facebookClick}
        className="btn"
      >
        {props.children}
      </button>
    </div>
  );
};
export default SocialButton;
