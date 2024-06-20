import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2b3e50;
  color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border: none;
  border-radius: 5px;
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
`;

const ProfileForm = ({ name, setName, email, setEmail, password, setPassword, handleUpdate, handleDeleteAccount, handleReferFriend }) => {
  return (
    <FormContainer>
      <h1>Profil</h1>
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
      <Button bgColor="#f0ad4e" onClick={handleReferFriend}>PARRAINER UN AMI</Button>
    </FormContainer>
  );
};

export default ProfileForm;
