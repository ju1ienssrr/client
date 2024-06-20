import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { setUser } from '../features/user/userSlice';
import jwt from 'jsonwebtoken';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #2b3e50;
  color: white;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 300px;
  border: none;
  border-radius: 5px;

  @media (max-width: 768px) {
    width: 100%;
  }
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

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', { username: email, password });
      const { token } = response.data;
      const decodedToken = jwt.decode(token);
      dispatch(setUser({ name: decodedToken.name, email: decodedToken.email, token }));
      toast.success('Connexion réussie !');
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      console.error('Login failed', error);
      toast.error('Échec de la connexion');
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Title>Connexion</Title>
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
      <Button onClick={handleLogin} disabled={user.status === 'loading'}>
        Se connecter
      </Button>
      {user.status === 'loading' && <p>Loading...</p>}
      {user.status === 'failed' && <p>Error: {user.error}</p>}
      <Link to="/signup" style={{ color: '#f0ad4e', marginTop: '10px' }}>
        Pas encore de compte ? Inscrivez-vous
      </Link>
    </Container>
  );
};

export default LoginPage;
