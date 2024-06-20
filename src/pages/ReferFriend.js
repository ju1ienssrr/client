import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const ReferContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2b3e50;
  color: white;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const CodeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #34495e;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0;
  width: 100%;
  box-sizing: border-box;
`;

const ReferralCode = styled.span`
  margin-right: 10px;
  flex-grow: 1;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: #f0ad4e;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 480px) {
    padding: 8px;
    margin: 8px 0;
  }
`;

const ReferFriend = () => {
  const [referralCode] = useState('ABC123XYZ');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    alert('Code copié dans le presse-papiers');
  };

  return (
    <ReferContainer>
      <h1>Parrainer un ami</h1>
      <p>Partagez ce code avec vos amis pour qu'ils puissent s'inscrire :</p>
      <CodeContainer>
        <ReferralCode>{referralCode}</ReferralCode>
        <Button onClick={copyToClipboard}>
          <FontAwesomeIcon icon={faCopy} />
        </Button>
      </CodeContainer>
    </ReferContainer>
  );
};

export default ReferFriend;
