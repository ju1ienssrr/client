import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2b3e50;
  width: 100%;
  padding: 10px 20px;
`;

const Logo = styled.img`
  width: 100px;
`;

const NavLinks = styled.div`
  a {
    margin: 0 10px;
    color: white;
    text-decoration: none;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo src="/logo.png" alt="Takeoff Takeout" />
      <NavLinks>
        <Link to="/login">Connexion</Link>
        <Link to="/signup">Inscription</Link>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;