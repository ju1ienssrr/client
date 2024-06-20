import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderItem = styled.div`
  background-color: #34495e;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const OrderName = styled.div`
  font-size: 18px;
`;

const OrderList = ({ orders }) => {
  const navigate = useNavigate();

  const handleOrderClick = (order) => {
    navigate('/delivery-tracking', { state: { order } });
  };

  return (
    <ListContainer>
      {orders.map((order, index) => (
        <OrderItem key={index} onClick={() => handleOrderClick(order)}>
          <OrderName>{order.name}</OrderName>
        </OrderItem>
      ))}
    </ListContainer>
  );
};

export default OrderList;