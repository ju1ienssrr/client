import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ProfilePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2b3e50;
  color: white;
  padding: 10px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2b3e50;
  color: white;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 8px;
    margin: 8px 0;
  }
`;

const Button = styled.button`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: ${props => props.bgColor || '#f0ad4e'};
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 480px) {
    padding: 8px;
    margin: 8px 0;
  }
`;

const UserPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUpdate = () => {
    // Logic to update profile
    alert('Profil mis à jour');
  };

  const handleDeleteAccount = () => {
    // Logic to delete account
    alert('Compte supprimé');
  };

  const handleGoToRestaurants = () => {
    navigate('/restaurants');
  };

  const handleGoToOrderRequests = () => {
    navigate('/order-requests');
  };

  const handleGoToDeliveryRequests = () => {
    navigate('/delivery-requests');
  };

  return (
    <ProfilePage>
      <ProfileContainer>
        <h1>User Page</h1>
        <Input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Button onClick={handleUpdate}>MODIFIER</Button>
        <Button bgColor="#d9534f" onClick={handleDeleteAccount}>SUPPRIMER MON COMPTE</Button>
        <Button bgColor="#f0ad4e" onClick={handleGoToRestaurants}>Go to Restaurants</Button>
        <Button bgColor="#f0ad4e" onClick={handleGoToOrderRequests}>Demande de commandes</Button>
        <Button bgColor="#f0ad4e" onClick={handleGoToDeliveryRequests}>Demande de livraisons</Button>
      </ProfileContainer>
    </ProfilePage>
  );
};

export default UserPage;
