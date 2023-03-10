import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { useParams } from "react-router-dom";
import { baseUrl, currentToken, currentUser } from "../components/Helpers";


const AccountDetails = () => {
  const [accounts, setAccounts] = useState(null);
  // const [name, setName] = useState(null);
  // const [number, setNember] = useState(null);
  // const [type, setType] = useState();
  // const [balance, setBalance] = useState(null);
  // const [opendate, setOpendate] = useState(null);
  // const [status, setStatus] = useState(null);
  // const { userId } = useParams();
  const [message, setMessage] = useState(null);


  const retrieveData = () => {
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
      return resp.json();
    })
    .then((data) => {
      setAccounts(data);

    })
    .catch((err) => {
      console.log(err);
      if (lastStatus===401) {
        setMessage("The token maybe expired or invalid, please login again.")
        return;
      }
      // console.log("we have a problem " + err.message);
      setMessage("we have a problem " + err.message);
    });

  };

  useEffect(() => {
    retrieveData();
  }, []);


  return (
    <Wrapper>
      <FormDiv>
        <Form>
          <Mydiv>Acconts Detailes</Mydiv>
          <table className="table border shadow">
            <thead>
              <Mytr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Number</th>
                <th scope="col">Type</th>
                <th scope="col">Balance</th>
                <th scope="col">Status</th>
                <th scope="col">OpenDate</th>
              </Mytr>
            </thead>
            <tbody>
              {accounts != null && accounts.map((account, index) => (
                <Mytr key={account.id}>
                  <Mytd>{index + 1}</Mytd>
                  <Mytd>{account.name}</Mytd>
                  <Mytd>{account.number}</Mytd>
                  <Mytd>{account.type}</Mytd>
                  <Mytd>{account.balance}</Mytd>
                  <Mytd>{account.status}</Mytd>
                  <Mytd>{account.opendate}</Mytd>
                </Mytr>
              ))}
            </tbody>
          </table>

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
  font-weight: 900px;
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
  height: calc(100vh - 60px);
  z-index: -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-y: hidden;
  overflow-x: hidden;
  top: 50%;
  left: 50%;
  @media (max-width:650px){
        position: static;
        .content{
            ul{
                display: none;
            }
        }
    }
`;

const FormDiv = styled.div`
`;

const Form = styled.form`
  height: 350px;
  width: 550px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 22, 0.8);
  padding: 30px;
  margin: 10px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
`;
const Label = styled.label`
  align-items: center;
  color: white;
  display: block;
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

const Button = styled.button`
  position: relative;
  align-items: center;
  margin-bottom: 20px;
  display: block;
  margin: 0 auto;
  width: 80px;
  background-color: #f9c000;
  color: #333;
  border: none;
  cursor: pointer;
  align-items: center;
  padding: 3px;
  font-weight: 300;
  margin-top: 5px;
  font-size: 15px;
  border-radius: 0px;
  box-shadow: 0 0 4px #f7dd00;
  transition: box-shadow 0.5s ease;
`;


export default AccountDetails