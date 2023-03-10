import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { baseUrl, currentToken, removeUser } from "../components/Helpers";
import "./TransactionStyles.css";
import { UserContext } from "../components/UserContext";

const Transactions = () => {

  const [transactions, setTransactions] = useState(null);
  const { accountId } = useParams();
  const { accountNumber } = useParams();
  const [message, setMessage] = useState(null);
  const { expired, setExpired } = useContext(UserContext);

  const retrieveData = () => {

    var lastStatus;
    setMessage("");

    fetch(baseUrl() + `/api/transaction/account/${accountId}?page=0&size=1000`, {
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Authorization": 'Bearer ' + currentToken()
      }
    })
      .then((resp) => {
        lastStatus = resp.status;
        if (lastStatus === 401 || lastStatus === 403) {
          setMessage("The token maybe is expired or invalid, please login again.")
          removeUser();
          setExpired(true);
          return;
        }
        return resp.json();
      })
      .then((data) => {
        setTransactions(data);
      })
      .catch((err) => {
        console.log(err);
        if (lastStatus === 401 || lastStatus === 403) {
          setMessage("The token maybe is expired or invalid, please login again.")
          removeUser();
          return;
        }
        // console.log("we have a problem " + err.message);
        setMessage("we have a problem " + err.message);
      });

  };


  const changeDate = (date) => {
    if (date === null) return "-";
    var index = date.indexOf(".");
    if (index > 0) {
      date = date.substring(0, index);
    }
    date = date.replace("T", " ");

    return date;
  }

  useEffect(() => {
    retrieveData();
  }, []);


  return (
    <Wrapper className="wrapper">
      <FormDiv>
        <Content>
          <Mydiv>Transactions</Mydiv>
          <div className="tableContainer">
            <table >
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Type</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date</th>
                  <th scope="col">From Account</th>
                  <th scope="col">To Account</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {transactions != null && transactions.map((transaction, index) => (
                  <tr key={transaction.id}>
                    <td data-label="ID">{transaction.id}</td>
                    <td data-label="Type">{transaction.type}</td>
                    <td data-label="Amount">{
                      ((transaction.type === "DEPOSIT") ||
                        (transaction.type === "TRANS" && (transaction.toAccount !== null && parseFloat(transaction.toAccount) === parseFloat(accountNumber)))) ?
                        transaction.amount : <font color="red">{(0 - transaction.amount)}</font>
                    }</td>
                    <td data-label="Date">{changeDate(transaction.transactiondate)}</td>
                    <td data-label="From">{transaction.fromAccount}</td>
                    <td data-label="To">{transaction.toAccount === null ? "-" : transaction.toAccount}</td>
                    <td data-label="Description">{transaction.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
          <MessageLabel> {message} </MessageLabel>

        </Content>
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

const Wrapper = styled.div`
  height: 150vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  // @media (max-width: 450px){
  //   flex-direction: column-reverse;
  //   margin-top: 100px;
  // }
`;

const FormDiv = styled.div`
    width: 100vw - 100px;
    height: 800px;
    @media (max-width: 760px){
      width: 100vw - 60px;
    }
`;

const Content = styled.div`
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



export default Transactions