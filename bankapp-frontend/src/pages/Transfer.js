import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { baseUrl, currentToken, currentUser, removeUser } from "../components/Helpers";
import "./TransferStyles.css";
import { UserContext } from '../components/UserContext';

const Transfer = () => {
  const [message, setMessage] = useState(null);
  const [fromAccounts, setFromAccounts] = useState([]);
  const [fromAccount, setFromAccount] = useState([]);
  const [toAccounts, setToAccounts] = useState([]);
  const [toAccount, setToAccount] = useState([]);
  const [amount, setAmount] = useState();
  const navigate = useNavigate();
  const { expired, setExpired } = useContext(UserContext);

  useEffect(() => {
    var lastStatus;

    if (currentUser() === null) {
      navigate("/");
    }

    fetch(baseUrl() + `/api/accounts/user/${currentUser()}`, {
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Authorization": 'Bearer ' + currentToken()
      }
    })
      .then((res) => {
        lastStatus = res.status;
        return res.json();
      })
      .then((result) => {
        setFromAccounts(result);
        setToAccounts(result);
      })
      .catch((err) => {
        if (lastStatus === 401 || lastStatus === 403) {
          setMessage("The token maybe expired or invalid, please login again.")
          removeUser();
          setExpired(true);
          return;
        }
        console.log(err);
        setMessage("we have a problem " + err.message);
      });;
  }, []);


  const transferAmount = (e) => {

    let lastStatus;
    let errMsg;

    e.preventDefault();

    if (fromAccount === toAccount) {
      alert("The two accounts cannot be same.");
      return;
    }

    if (amount.trim() === "" || isNaN(amount)) {
      alert("Amount must be a number.");
      return;
    }

    fetch(baseUrl() + "/api/transfer", {
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Authorization": 'Bearer ' + currentToken(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "fromaccount": {
          "id": fromAccount
        },
        "toaccount": {
          "id": toAccount
        },
        "type": "TRANS",
        "amount": amount
      }),

    })

      .then((res) => {
        lastStatus = res.status;
        if (lastStatus === 401 || lastStatus === 403) {
          setMessage("The token maybe is expired or invalid, please login again.")
          removeUser();
          return;
        }
        return res.text();
      })
      .then((data) => {
        if (lastStatus === 401 || lastStatus === 403) {
          setMessage("The token maybe is expired or invalid, please login again.")
          removeUser();
          return;
        }
        if (lastStatus === 501) {
          alert(data);
        }
        if (lastStatus === 201) {
          alert("Amount is Transfered.");
          navigate("/accounts");
        }
      })
      .catch((err) => {
        console.log("we have a problem " + err.message);
      });
  };


  return (
    <Transferdiv className='wrapper'>
      <Transferform
        onSubmit={(e) => {
          transferAmount(e);
        }}>
        <div className="single">Transfer</div>

        <Wrap
          placeholder="Choose source"
          onChange={(ev) => {
            setFromAccount(ev.target.value);
          }}
        >
          <Item key="-1" value="-1">From Account</Item>
          {fromAccounts && fromAccounts.length > 0
            ? fromAccounts.map((account, key) => {
              return <Item key={account.id} value={account.id}>{account.name}</Item>;
            })
            : null}
        </Wrap>

        {/* second dropdown */}
        {/* <div>To Account</div> */}
        <Wrap2
          placeholder="Choose destination"
          onChange={(ev) => {
            setToAccount(ev.target.value);
          }}
        >
          <Item key="-1" value="-1">To Account</Item>
          {toAccounts && toAccounts.length > 0
            ? toAccounts.map((account, key) => {
              return <Item key={account.id} value={account.id}>{account.name}</Item>;
            })
            : null}
        </Wrap2>


        {/* <Transferlabel>Amount</Transferlabel> */}
        <Transferinput
          type="text"
          name="Amount"
          placeholder="Enter Your Amount..."
          onChange={(e) => setAmount(e.target.value)}
        />

        <TransferButton type="submit">Transfer</TransferButton>
        <MessageLabel> {message} </MessageLabel>
      </Transferform>
    </Transferdiv>
  )
}

const Mydiv = styled.div`
  color: white;
  align-items: center;
  margin-bottom: 30px;
  font-size: 22px;

`;

const Wrap = styled.select`
  padding: 10px;
  background-color: white;
  border: none;
  margin-bottom: 20px;

`;
const Wrap2 = styled.select`
  padding: 10px;
  background-color: white;
  border: none;
  margin-bottom: 20px;
`;

const Item = styled.option`
  display: inline-block;
  color: gray;
  
`;


const Transferlabel = styled.label`
  margin: 10px 0;
  color: white;
`;


const Transferinput = styled.input`
  padding: 10px;
  background-color: white;
  border: none;
`;

const TransferButton = styled.button`
  margin-top: 20px;
  cursor: pointer;
  background-color: #ffd617;
  border: none;
  padding: 10px;
`;


const Transferform = styled.form`
  margin-top: 20px;
  display: flex;
  height: 330px;
  width: 250px;
  flex-direction: column;
  // @media (max-width:550px){
  //   flex-direction: column-reverse;
  // }
`;

const Transferdiv = styled.div`
height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background-color: #333333;
  @media (max-width:550px){
    flex-direction: column-reverse;
  }

    

`;

const MessageLabel = styled.label`
  align-items: center;
  color: white;
  margin-left: 2px;
  display: block;
  font-weight: 300;
  font-size:20px;
  margin-top: 160px;
 `;

export default Transfer