import React from "react";
import { useNavigate as navigate } from "react-router";
import Global from "../components/Global";

const Logout = () => {

  localStorage.setItem("token", null);
  localStorage.setItem("userId", null);
  localStorage.setItem("userName", null);
  Global.expired = true;

  navigate("/login");

  return <div></div>;
};

export default Logout;
