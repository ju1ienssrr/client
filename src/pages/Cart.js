import React from 'react';
import styled from 'styled-components';

const CartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  color: white;
`;

const ItemsSection = styled.div`
  width: 60%;
`;

const PaymentSection = styled.div`
  width: 35%;
`;

const Title = styled.h1`
  margin-bottom: 10px;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  background-color: #34495e;
  border-radius: 10px;
  padding: 10px;
`;

const ItemName = styled.div`
  font-size: 18px;
`;

const ItemPrice = styled.div`
  font-size: 18px;
`;

const Total = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
`;

const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
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
  background-color: #f0ad4e;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Cart = () => {
  return (
    <CartContainer>
      <ItemsSection>
        <Title>Articles</Title>
        <ItemList>
          <Item>
            <ItemName>Burger x1</ItemName>
            <ItemPrice>$10</ItemPrice>
          </Item>
          <Item>
            <ItemName>Pizza x2</ItemName>
            <ItemPrice>$20</ItemPrice>
          </Item>
          <Total>Total: $30</Total>
        </ItemList>
      </ItemsSection>
      <PaymentSection>
        <Title>Paiement</Title>
        <PaymentForm>
          <Input type="text" placeholder="Nom sur la carte" />
          <Input type="text" placeholder="Numéro de carte" />
          <Input type="text" placeholder="Date d'expiration" />
          <Input type="text" placeholder="CVC" />
          <Button>Valider et Payer</Button>
        </PaymentForm>
      </PaymentSection>
    </CartContainer>
  );
};

export default Cart;