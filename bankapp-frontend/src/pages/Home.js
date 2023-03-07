import React from 'react'
import styled from 'styled-components';
import Background from "../assets/background.jpg";


const Home=()=> {
  return (
    <Homediv className='home'>


    </Homediv>
  )
}

const Homediv = styled.div`

  height: 60vh ;

  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  background-image:  url(${Background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-y: hidden; 
  overflow-x: hidden; 
  @media screen and (max-width: 640px) {
    align-items:center;
    justify-content:center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
    
}
`;

export default Home