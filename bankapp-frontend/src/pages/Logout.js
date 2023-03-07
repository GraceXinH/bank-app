import React from "react";
import { useNavigate as navigate } from "react-router";

const Logout = () => {

  localStorage.setItem("token", null);
  localStorage.setItem("userId", null);
  localStorage.setItem("userName", null);

  navigate("/login");

  return <div></div>;
};

export default Logout;
