import React, { useState, useContext } from "react";
import styled from "styled-components";
import "./CreateAccountStyles.css";
import { baseUrl, currentToken, currentUser } from "../components/Helpers";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../components/Helpers";
import { UserContext } from "../components/UserContext";

const CreatAccount = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("CHEQUING");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { expired, setExpired } = useContext(UserContext);

  var lastStatus;
  var errMsg;

  const creatNewAccount = (e) => {
    e.preventDefault();


    fetch(baseUrl() + "/api/account", {
      method: "POST",
      body: JSON.stringify({
        user: {
          id: currentUser()
        },
        name: name,
        type: type,
      }),
      headers: {
        "Authorization": 'Bearer ' + currentToken(),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        lastStatus = res.status;
        errMsg = res.msg;
        return res.json();
      })
      .then((data) => {
        if (lastStatus === 401 || lastStatus === 403) {
          setMessage("The token maybe expired or invalid, please login again.")
          removeUser();
          setExpired(true);
          return;
        }
        if (lastStatus === 501) {
          alert(errMsg);
        }
        if (lastStatus === 201) {
          alert("Account is Created.");
          setName("");
        }
      })
      .catch((err) => {
        console.log("we have a problem " + err.message);
      });
  };


  return (
    <Creatdiv className="createDiv">
      <Creatform
        onSubmit={(e) => {
          creatNewAccount(e);
        }}
      >
        <div className="container">
          <div className="single">
            <CreatSpan>Open New Account</CreatSpan>
          </div>
          <div className="row">
            <div className="col-25">
              <Creatlabel>Name(Optional): </Creatlabel>
            </div>
            <div className="col-75">
              <Creatinput
                type="text"
                name="name"
                placeholder="Enter Your Account Name ..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <Creatlabel>Type: </Creatlabel>
            </div>
            <div className="col-75">
              <Wrap
                onChange={(ev) => {
                  setType(ev.target.value);
                }}
              >
                <Item value="CHEQUING">CHEQUING</Item>
                <Item value="SAVING">SAVING</Item>
              </Wrap>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <Creatlabel></Creatlabel>
            </div>
            <div className="col-75 buttonRight">
              <CreatButton type="submit">Open</CreatButton>
              <BackButton type="button" onClick={(e) => {
                e.preventDefault();
                navigate("/accounts")
              }}>Back</BackButton>

            </div>
          </div>

        </div>
        <MessageLabel> {message} </MessageLabel>
      </Creatform>
    </Creatdiv>
  );
};

const Wrap = styled.select`
 padding: 10px;
  background-color: white;
  border: none;
  // margin-bottom: 20px;
 
`;

const Item = styled.option`
  display: inline-block;
  color: gray;
  
`;


const Creatdiv = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background-color: #778da9;
  @media (max-width:550px){
        flex-direction: column-reverse;
    }

`;

const CreatSpan = styled.span`
  font-size: 25px;
  color: white;
`;

const Creatform = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const Creatlabel = styled.label`
  margin: 10px 10px 10px 0;
  padding-right: 10px;
  color: white;
`;

const Textlabel = styled.label`
  margin: 10px 0;
  color: white;
  font-size: 12px;
  font-weight: 50;
`;

const Creatinput = styled.input`
  padding: 10px;
  background-color: white;
  border: none;
`;

const CreatButton = styled.button`
  margin-top: 20px;
  cursor: pointer;
  background-color: #008CBA;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px;
`;

const BackButton = styled.button`
  margin-top: 20px;
  margin-left: 10px;
  cursor: pointer;
  background-color: #555555;
  color: #fff;
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

const MessageLabel = styled.label`
  align-items: center;
  color: white;
  margin-left: 2px;
  display: block;
  font-weight: 300;
  font-size:20px;
  margin-top: 10px;
`;

export default CreatAccount;
