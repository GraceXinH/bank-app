import React, { useContext } from "react";
import { useNavigate as navigate } from "react-router";
import Global from "../components/Global";
import { UserContext } from "../components/UserContext";

const Logout = () => {
  const { setExpired } = useContext(UserContext);

  localStorage.setItem("token", null);
  localStorage.setItem("userId", null);
  localStorage.setItem("userName", null);
  Global.expired = true;
  setExpired(true);

  navigate("/login");

  return <div></div>;
};

export default Logout;
