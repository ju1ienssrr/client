import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import OrderList from '../components/user/OrderList';

const OrdersContainer = styled.div`
  padding: 20px;
  color: white;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 20px;
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

const Orders = () => {
  const navigate = useNavigate();
  const currentOrders = [
    { name: 'Commande 1 - Jefe Burger' },
    { name: 'Commande 2 - Verratti\'s Pizzas' },
  ];

  const pastOrders = [
    { name: 'Commande 3 - Maurice Bappon pasta' },
    { name: 'Commande 4 - Future Goat' },
  ];

  return (
    <OrdersContainer>
      <Title>Commandes</Title>
      <Section>
        <h2>Commandes en cours</h2>
        <OrderList orders={currentOrders} />
      </Section>
      <Section>
        <h2>Dernières Commandes</h2>
        <OrderList orders={pastOrders} />
      </Section>
      <Button as={Link} to="/order-history">Historique des commandes</Button>
    </OrdersContainer>
  );
};

export default Orders;