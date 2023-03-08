import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { userName, logout } from "./Helpers";
import Global from "./Global";

const Topbar = () => {

  // const [ login, setLogin ] = useState(false);

  const handleLogout = (e) => {
    logout();
    // setLogin(false);
    window.location = "/";
  }

  useEffect(() => {
    // console.log("topbar awake.");
  }, [Global.expired]);

  return (
    <Wrapper>
      <TopCenter>
        <NavigationList>
          <LiDiv>
            <NavigationLink to="/">HOME</NavigationLink>
            {localStorage.getItem("userId") !== null && (
              <>
            <NavigationLink to="/accounts">ACCOUNTS</NavigationLink>
            <NavigationLink to="/transfer">TRANSFER</NavigationLink>
            
            </>
            )}
          </LiDiv>
        </NavigationList>
      </TopCenter>

      <TopRight>
        <NavigationList>
          <LeftLiDiv>
            {(localStorage.hasOwnProperty('userId')) && !Global.expired ? (
              <>
              <NavigationLink to="/profile">Welcome {userName()}!</NavigationLink>
              <button onClick={handleLogout}>Logout</button></>

            ) : (<>
              <NavigationLink to="/Register"> Register</NavigationLink>
              <NavigationLink to="/Login">Login</NavigationLink>
              </>
            )}
          </LeftLiDiv>

          
        </NavigationList>
      </TopRight>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
  color: #ea7023;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  font-family: "Josefin Sans", sans-serif;
  z-index: 999;
  overflow: hidden;
  @media (max-width:550px){
        position: static;
        .content{
            ul{
                display: none;
            }
        }
  }
`;

const TopLeft = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopCenter = styled.div`
  flex: 6;
  display: flex;
  margin: 10;
  padding: 0;
  list-style: none;
`;

const TopRight = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavigationList = styled.ul`
  list-style-type: none;
  display: flex;
`;

const LiDiv = styled.li`
  list-style-type: none;
  margin: 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  @media (max-width:550px){
    font-size: 14px;
  }
`;
const LeftLiDiv = styled.li`
  list-style-type: none;
  margin-right: 1px;
  font-size: 15px;
  font-weight: 300;
  cursor: pointer;
  @media (max-width:550px){
    font-size: 14px;
  }
}
`;

const IconeDiv = styled.div`
  font-size: 20px;
  margin-right: 10px;
  color: #444;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IDiv = styled.div`
  margin: 10px;
`;

const NavigationLink = styled(NavLink)`
  position: relative;
  text-decoration: none;
  padding: 0 16px;
  &.active {
    color: #ea7023;
  }
  &:after {
    content: "";
    position: absolute;
    background-color: currentColor;
    left: 0;
    right: 0;
    bottom: -5px;
    width: 70%;
    margin: auto;
    height: 3px;
    transform: scaleX(0);
    transform-origin: center center;
    border-radius: 2px;
  }
  &.active:after {
    /* transition: transform 250ms, opacity 150ms; */
    transform: scaleX(1);
    opacity: 1;
  }
  @media (max-width:550px){
    position: relative;
    text-decoration: none;
    padding: 0 5px;
  }
`;

export default Topbar;
