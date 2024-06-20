import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../logo.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #2b3e50;
  color: white;
  padding: 20px;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Button = styled(Link)`
  padding: 10px 20px;
  margin: 10px 0;
  background-color: #f0ad4e;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  text-align: center;
  width: 200px;

  &:hover {
    opacity: 0.9;
  }
`;

const LandingPage = () => {
  return (
    <Container>
      <Logo src={logo} alt="Logo" />
      <Title>Bienvenue sur Takeoff Takeout</Title>
      <Button to="/login">Connexion</Button>
      <Button to="/signup">Inscription</Button>
    </Container>
  );
};

export default LandingPage;
