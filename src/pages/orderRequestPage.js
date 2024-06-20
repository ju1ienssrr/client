import React, { useState, useEffect } from 'react';
import { restaurantApi, orderApi } from '../api/api';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  color: #333;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const OrderList = styled.ul`
  list-style: none;
  padding: 0;
`;

const OrderItem = styled.li`
  background: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const OrderText = styled.p`
  margin: 0;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #ff7f50;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #ff6347;
  }
`;

const StatusMessage = styled.p`
  font-size: 16px;
  color: #555;
  margin-top: 10px;
`;

function OrderRequestPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);
  const [articles, setArticles] = useState({});
  const [restaurateurId, setRestaurateurId] = useState(1); // Remplacer par l'ID du restaurateur réel

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await restaurantApi.get(`/restaurants/restaurateur/${restaurateurId}`);
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, [restaurateurId]);

  useEffect(() => {
    const fetchOrders = async (restaurantIds) => {
      try {
        const response = await orderApi.get(`/orders/confirmed/${restaurantIds.join(',')}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (restaurants.length > 0) {
      const restaurantIds = restaurants.map((restaurant) => restaurant.ID_Restaurant);
      fetchOrders(restaurantIds);
    }
  }, [restaurants]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articleIds = orders.flatMap(order => order.articles);
        const uniqueArticleIds = [...new Set(articleIds)];
        const articleResponses = await Promise.all(uniqueArticleIds.map(id => restaurantApi.get(`/articles/${id}`)));
        const articlesMap = articleResponses.reduce((acc, response) => {
          acc[response.data.ID_Article] = response.data.article_Name;
          return acc;
        }, {});
        setArticles(articlesMap);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    if (orders.length > 0) {
      fetchArticles();
    }
  }, [orders]);

  const handleAcceptOrder = async (orderId) => {
    try {
      await orderApi.put(`/orders/${orderId}`, { state: 'order accepted by restaurant' });
      setOrders(orders.map(order => 
        order.ID_Order === orderId ? { ...order, state: 'order accepted by restaurant' } : order
      ));
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  return (
    <Container>
      <Title>Order Requests</Title>
      {orders.length > 0 ? (
        <OrderList>
          {orders.map((order) => (
            <OrderItem key={order.ID_Order}>
              <OrderDetails>
                <OrderText><strong>Commande numéro:</strong> {order.ID_Order}</OrderText>
                <OrderText><strong>Prix:</strong> {order.price}€</OrderText>
                <OrderText><strong>Articles:</strong> {order.articles.map(articleId => articles[articleId] || articleId).join(', ')}</OrderText>
              </OrderDetails>
              {order.state === 'order confirmed' && (
                <Button onClick={() => handleAcceptOrder(order.ID_Order)}>Accepter commande</Button>
              )}
              {order.state === 'order accepted by restaurant' && (
                <StatusMessage>En attente de livreur</StatusMessage>
              )}
            </OrderItem>
          ))}
        </OrderList>
      ) : (
        <p>No confirmed orders found for your restaurants.</p>
      )}
    </Container>
  );
}

export default OrderRequestPage;
