import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl, currentUser, currentToken, removeUser } from "../components/Helpers";
import "./MyAccountsStyles.css";
import Global from "../components/Global";


const MyAccounts = () => {
  const [accounts, setAccounts] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  function retrieveData() {

    var lastStatus;

    fetch(baseUrl() + `/api/accounts/user/${currentUser()}`, {
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Authorization": 'Bearer ' + currentToken()
      }
    })
      .then((resp) => {
        lastStatus = resp.status;
        if (lastStatus === 401 || lastStatus === 403) {
          removeUser();
          throw new Error("The token maybe expired or invalid, please login again.");
        }
        return resp.json();

      })
      .then((data) => {
        setAccounts(data);

      })
      .catch((err) => {
        if (lastStatus === 401 || lastStatus === 403) {
          setMessage("The token maybe expired or invalid, please login again.")
          removeUser();
          return;
        }
        console.log(err);
        setMessage("we have a problem " + err.message);
      });

  };

  const transactionRoute = (e) => {
    let path = `/transaction/${e.currentTarget.dataset.id}`;
    navigate(path);
  }

  const createAccountRoute = (e) => {
    let path = `/create`;
    navigate(path);
  }

  useEffect(() => {
    retrieveData();
  }, []);

  function operation(e) {
    e.preventDefault();

    var id = e.currentTarget.dataset.id;
    var action = e.currentTarget.dataset.action;

    if (action !== "DEPOSIT" && action !== "WITHDRAW") {
      alert("The page has been modified, please call the admin.")
      return;
    }

    var amount = prompt('Please Enter the ' + action + ' Amount:');
    if (amount == null || amount === "") {
      return;
    }
    if (amount.trim() === "" || isNaN(amount)) {
      alert("You must enter a number.");
      return;
    }

    fetch(baseUrl() + "/api/operation", {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({
        accountId: id,
        action: action,
        amount: amount
      }),
      headers: {
        "Authorization": 'Bearer ' + currentToken(),
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        return response;
      })
      .then(data => {
        // handle successful response
        console.log(data);
        if (data.status === 500) {
          data.text().then((result) => alert(result));
          return;
        }
        if (data.status === 401 || data.status === 403) {
          removeUser();
          data.text().then((result) => alert(result));
          return;
        }
        alert("Operation succeeded.");
        retrieveData();
      })
      .catch(error => {
        console.error(error.message);
      });

  };


  return (
    <Wrapper className="wrapper">
      <FormDiv>
        <Form>
          <div className="buttonDiv">
            <div className="buttonContent">
              <button className="button button2" onClick={createAccountRoute.bind(this)} >Open new</button>
            </div>
          </div>
          <Mydiv>My Accounts</Mydiv>
          <div className="tableContainer">
            <table>
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Number</th>
                  <th scope="col">Type</th>
                  <th scope="col">Balance</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts != null && accounts.map((account, index) => (
                  <tr key={account.id}>
                    <td data-label="ID">{index + 1}</td>
                    <td data-label="Name">
                      <Link to={`/accountDetail/${account.id}`} >{account.name}</Link>
                    </td>
                    <td data-label="Number">{account.number}</td>
                    <td data-label="Type">{account.type}</td>
                    <td data-label="Balance">{account.balance}</td>
                    <td data-label="Actions">
                      <button className="button button2" onClick={operation.bind(this)} data-id={account.id} data-action="DEPOSIT">Deposit</button>
                      <button className="button button5" onClick={operation.bind(this)} data-id={account.id} data-action="WITHDRAW">Withdraw</button>
                      <button className="button button5" onClick={transactionRoute.bind(this)} data-id={account.id} data-action="WITHDRAW">Transaction</button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <MessageLabel> {message} </MessageLabel>
        </Form>
      </FormDiv>
    </Wrapper>
  )
}

const Mydiv = styled.div`
  color: white;
  display: flex;
  align-items: center;
  // font-weight: 900px;
  margin-bottom: 30px;
  font-size: 22px;

`;

const Mytr = styled.tr`
justify-content: space-around;
margin-left:20px;
color:white;
align-items: center;
font-size: 18px;
`;

const Mytd = styled.td`
color:white;
justify-content: space-around;
padding: 10px;

`;

const Wrapper = styled.div`
  height: calc(100vh - 0px);
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  // background-color: #333333;
  // @media (max-width: 450px){
  //       flex-direction: column-reverse;
  //   }
`;

const FormDiv = styled.div`
    width: 100vw - 100px;
    height: 800px;
    @media (max-width: 760px){
      width: 100vw - 60px;
    }
`;

const Form = styled.form`
  height: 350px;
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  // background: #8d99ae;
  padding: 30px;
  margin: 10px;
  border: none;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  @media (max-width: 760px){
    height: auto;
    padding: 10px 10px;
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


export default MyAccounts