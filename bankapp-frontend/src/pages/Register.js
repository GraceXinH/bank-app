import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { baseUrl } from "../components/Helpers";

const Register = () => {
  const navigate = useNavigate();
  const [loginname, setLoginname] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  var lastStatus;
  var errMsg;

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== Cpassword) {
      alert("Your entered passwords doesn't match. Please try again!");
      return true;
    }
    fetch(baseUrl() + "/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify({
        loginname: loginname,
        password: password,
        firstname: firstname,
        lastname: lastname,
        address: address,
        phone: phone,
        role: "USER",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        lastStatus = res.status;
        errMsg = res.msg;
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (lastStatus === 501) {
          alert(errMsg);
        }
        if (lastStatus === 200) {
          alert("User is registered.");
          localStorage.setItem("Current_User", loginname);
          // after registration, directly going to the login page
          // using react router dom ver.6 usehystory=navigate
          navigate("/Login");
        }
      })
      .catch((err) => {
        console.log("we have a problem " + err.message);
      });
  };

  return (
    <Registerdiv>
      <Registerform
        onSubmit={(e) => {
          registerUser(e);
        }}
      >
        <div className="container">
          <div className="single">
            <RegisterSpan>Register:</RegisterSpan>
          </div>
          <div className="row">
            <div className="col-25">
              <Registerlabel>Login Name:</Registerlabel>
            </div>
            <div className="col-75">
              <Registerinput
                type="text"
                name="loginname"
                placeholder="Enter Your User Name ..."
                value={loginname}
                onChange={(e) => setLoginname(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <Registerlabel>Password:</Registerlabel>
            </div>
            <div className="col-75">
              <Registerinput
                type="password"
                name="password"
                placeholder="Choose a Password ..."
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <Registerlabel>Confirm:</Registerlabel>
            </div>
            <div className="col-75">
              <Registerinput
                type="password"
                name="confirm"
                placeholder="Confirm the Password ..."
                onChange={(e) => setCPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <Registerlabel>First Name:</Registerlabel>
            </div>
            <div className="col-75">
              <Registerinput
                type="text"
                name="firstName"
                placeholder="Enter Your First Name ..."
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <Registerlabel>Last Name:</Registerlabel>
            </div>
            <div className="col-75">
              <Registerinput
                type="text"
                name="lastName"
                placeholder="Enter Your Last Name ..."
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <Registerlabel>Phone:</Registerlabel>
            </div>
            <div className="col-75">
              <Registerinput
                type="text"
                name="phone"
                placeholder="Enter Your Phone Number..."
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <Registerlabel>Address:</Registerlabel>
            </div>
            <div className="col-75">
              <Registerinput
                type="text"
                name="address"
                placeholder="Enter Your Address..."
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="single">
            <RegisterButton type="submit">Register</RegisterButton>
          </div>
        </div>
      </Registerform>
    </Registerdiv >
  );
};

const Registerdiv = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--back);
  @media (max-width:550px){
    flex-direction: column-reverse;
  }

`;

const RegisterSpan = styled.span`
  font-size: 30px;
  color: white;
`;

const Registerform = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const Registerlabel = styled.label`
  margin: 10px 0;
  color: white;
`;

const Registerinput = styled.input`
  padding: 10px;
  background-color: white;
  border: none;
  width: 100%;
`;

const RegisterButton = styled.button`
  margin-top: 20px;
  cursor: pointer;
  background-color: #ffd617;
  border: none;
  border-radius: 10px;
  padding: 10px;
`;

const LoginRegisterButton = styled.button`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: #444;
  cursor: pointer;
  border: none;
  padding: 10px;
  border-radius: 10px;
  color: white;
`;

export default Register;
