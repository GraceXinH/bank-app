import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../components/UserContext";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { baseUrl } from "../components/Helpers";
import Global from "../components/Global";

const Login = () => {
  const { expired, setExpired } = useContext(UserContext);

  const [loginname, setLoginname] = useState(
    localStorage.getItem("Current_User")
  );
  const [password, setPassword] = useState("");
  var lastStatus;
  const navigate = useNavigate();

  const signing_in = (e) => {
    e.preventDefault();

    fetch(baseUrl() + "/api/v1/auth/authenticate", {
      method: "POST",
      body: JSON.stringify({
        loginname: loginname,
        password: password
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        lastStatus = res.status;
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        if (lastStatus === 500) {
          alert("Please check your login name and password.");
        }

        if (lastStatus === 200) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("userName", data.userName);
          Global.expired = false;
          setExpired(false);
          navigate("/accounts");
        }
      })
      .catch((err) => {
        console.log("we have a problem " + err.message);
      });
  };

  return (
    <Logindiv>
      <Loginform
        onSubmit={(e) => {
          signing_in(e);
        }}
      >

        <Loginlabel>User Name</Loginlabel>
        <Logininput
          type="text"
          value={loginname !== null ? loginname : ""}
          onChange={(e) => setLoginname(e.target.value)}
        />

        <Loginlabel>Password</Loginlabel>
        <Logininput
          type="password"
          placeholder="Enter your password ..."
          onChange={(e) => setPassword(e.target.value)}
        />

        <LoginButton>Login</LoginButton>
      </Loginform>
    </Logindiv>
  );
};

const Logindiv = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-color: var(--back);
  @media (max-width:550px){
    flex-direction: column-reverse;
  }
`;

const Loginform = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  background-color: var(--back);
`;

const Loginlabel = styled.label`
  margin: 10px 0;
  color: white;
`;
const Logininput = styled.input`
  padding: 10px;
  background-color: white;
  border: none;
`;

const LoginButton = styled.button`
  margin-top: 20px;
  cursor: pointer;
  background-color: #ffd617;
  border: none;
  border-radius: 10px;
  padding: 10px;
`;

export default Login;
