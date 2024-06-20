import React from 'react';
import styled from 'styled-components';

const OrderHistoryContainer = styled.div`
  padding: 20px;
  color: white;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderItem = styled.div`
  background-color: #34495e;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;

const OrderName = styled.div`
  font-size: 18px;
`;

const OrderDate = styled.div`
  font-size: 14px;
  color: #f0ad4e;
`;

const OrderHistory = () => {
  return (
    <OrderHistoryContainer>
      <Title>Historique des commandes</Title>
      <OrderList>
        <OrderItem>
          <OrderName>Commande 1 - Jefe Burger</OrderName>
          <OrderDate>12/06/2024</OrderDate>
        </OrderItem>
        <OrderItem>
          <OrderName>Commande 2 - Verratti's Pizzas</OrderName>
          <OrderDate>11/06/2024</OrderDate>
        </OrderItem>
      </OrderList>
    </OrderHistoryContainer>
  );
};

export default OrderHistory;