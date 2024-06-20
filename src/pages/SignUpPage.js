import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 300px;
  border: none;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 10px;
  margin: 10px 0;
  width: 320px;
  border: none;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  margin: 10px 0;
  width: 320px;
  border: none;
  border-radius: 5px;
  background-color: #f0ad4e;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('client');

  const handleSignUp = () => {
    // Logic for sign up, including account type
    alert(`Signed up as ${accountType}`);
  };

  return (
    <Container>
      <Title>Inscription</Title>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Confirmer le mot de passe"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
        <option value="client">Client</option>
        <option value="restaurateur">Restaurateur</option>
        <option value="livreur">Livreur</option>
        <option value="developpeur">Développeur tiers</option>
        <option value="commercial">Service commercial</option>
      </Select>
      <Button onClick={handleSignUp}>S'inscrire</Button>
      <Link to="/login" style={{ color: '#f0ad4e', marginTop: '10px' }}>Déjà un compte ? Connectez-vous</Link>
    </Container>
  );
};

export default SignUpPage;
