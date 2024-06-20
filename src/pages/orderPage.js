import React, { useState, useEffect } from 'react';
import { cartApi, orderApi, restaurantApi } from '../api/api';
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

const SectionTitle = styled.h2`
  margin-bottom: 20px;
`;

const Card = styled.div`
  background: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  background: #e8e8e8;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background-color: #ff7f50;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #ff6347;
  }
`;

const StatusMessage = styled.p`
  font-size: 16px;
  color: #555;
  margin-top: 10px;
`;

function OrderPage() {
  const [cart, setCart] = useState(null);
  const [clientId, setClientId] = useState(1); // Remplacer par l'ID du client réel
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [articles, setArticles] = useState([]);
  const [menus, setMenus] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');

  const fetchArticlesAndMenus = async (cartOrOrder) => {
    try {
      if (cartOrOrder) {
        const articleIds = cartOrOrder.articles;
        const menuIds = cartOrOrder.menus;

        const articlesPromises = articleIds.map(id => restaurantApi.get(`/articles/${id}`));
        const menusPromises = menuIds.map(id => restaurantApi.get(`/menus/${id}`));

        const articlesResponses = await Promise.all(articlesPromises);
        const menusResponses = await Promise.all(menusPromises);

        setArticles(articlesResponses.map(res => res.data));
        setMenus(menusResponses.map(res => res.data));

        console.log('Fetched articles:', articlesResponses.map(res => res.data));
        console.log('Fetched menus:', menusResponses.map(res => res.data));
      }
    } catch (error) {
      console.error('Error fetching articles and menus:', error);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await cartApi.get(`/carts/${clientId}`);
        setCart(response.data);
        await fetchArticlesAndMenus(response.data);
        const restaurantResponse = await restaurantApi.get(`/restaurants/${response.data.ID_Restaurant}`);
        setRestaurantName(restaurantResponse.data.nom_Restaurant);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    const fetchConfirmedOrder = async () => {
      try {
        const response = await orderApi.get(`/orders`);
        const confirmedOrders = response.data.filter(order => order.ID_Client === clientId && order.state !== 'order canceled by client');
        if (confirmedOrders.length > 0) {
          const confirmedOrder = confirmedOrders[0]; // Prendre la première commande confirmée
          setConfirmedOrder(confirmedOrder);
          await fetchArticlesAndMenus(confirmedOrder);
          const restaurantResponse = await restaurantApi.get(`/restaurants/${confirmedOrder.ID_Restaurant}`);
          setRestaurantName(restaurantResponse.data.nom_Restaurant);
        }
      } catch (error) {
        console.error('Error fetching confirmed orders:', error);
      }
    };

    fetchCart();
    fetchConfirmedOrder();
  }, [clientId]);

  const handleDeleteCart = async () => {
    try {
      if (cart && cart.ID_Cart) {
        await cartApi.delete(`/carts/${cart.ID_Cart}`);
        setCart(null); // Clear the cart from state
        console.log('Cart deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting cart:', error);
    }
  };

  const handleConfirmOrder = async () => {
    try {
      if (cart) {
        const orderData = {
          ID_Client: cart.ID_Client,
          ID_Restaurant: cart.ID_Restaurant,
          price: cart.price,
          articles: cart.articles,
          menus: cart.menus,
          state: "order confirmed"
        };

        const response = await orderApi.post('/orders', orderData);
        console.log('Order confirmed successfully', response.data);
        handleDeleteCart(); // Delete the cart after confirming the order
        setConfirmedOrder(response.data); // Set the confirmed order in state
        await fetchArticlesAndMenus(response.data);
        const restaurantResponse = await restaurantApi.get(`/restaurants/${response.data.ID_Restaurant}`);
        setRestaurantName(restaurantResponse.data.nom_Restaurant);
      }
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await orderApi.put(`/orders/${orderId}`, { state: 'order canceled by client' });
      console.log('Order canceled successfully', response.data);
      // Mettre à jour l'état local pour refléter l'annulation
      setConfirmedOrder(null);
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  return (
    <Container>
      <Title>Current Cart</Title>
      {cart ? (
        <Card>
          <SectionTitle>Cart Details</SectionTitle>
          <p><strong>Cart ID:</strong> {cart.ID_Cart}</p>
          <p><strong>Restaurant:</strong> {restaurantName}</p>
          <List>
            <h4>Articles:</h4>
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <ListItem key={index}>{article.article_Name} - {article.price}€</ListItem>
              ))
            ) : (
              <ListItem>No articles in the cart.</ListItem>
            )}
          </List>
          <List>
            <h4>Menus:</h4>
            {menus.length > 0 ? (
              menus.map((menu, index) => (
                <ListItem key={index}>{menu.menu_Name} - {menu.price}€</ListItem>
              ))
            ) : (
              <ListItem>No menus in the cart.</ListItem>
            )}
          </List>
          <p><strong>Total Price:</strong> {cart.price}€</p>
          <Button onClick={handleDeleteCart}>Delete Cart</Button>
          <Button onClick={handleConfirmOrder}>Confirm Order</Button>
        </Card>
      ) : (
        <p>No cart found.</p>
      )}

      <Title>Order Status</Title>
      {confirmedOrder ? (
        <Card>
          <SectionTitle>Order Details</SectionTitle>
          <p><strong>Restaurant:</strong> {restaurantName}</p>
          <List>
            <h4>Articles:</h4>
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <ListItem key={index}>{article.article_Name} - {article.price}€</ListItem>
              ))
            ) : (
              <ListItem>No articles in the order.</ListItem>
            )}
          </List>
          <List>
            <h4>Menus:</h4>
            {menus.length > 0 ? (
              menus.map((menu, index) => (
                <ListItem key={index}>{menu.menu_Name} - {menu.price}€</ListItem>
              ))
            ) : (
              <ListItem>No menus in the order.</ListItem>
            )}
          </List>
          <p><strong>Total Price:</strong> {confirmedOrder.price}€</p>
          <StatusMessage>
            {confirmedOrder.state === 'order confirmed' && `En attente de confirmation par ${restaurantName}`}
            {confirmedOrder.state === 'order accepted by restaurant' && 'En attente de livreur'}
            {confirmedOrder.state === 'order delivery accepted' && 'Livraison pris en charge par <ajouter nom du livreur>'}
            {confirmedOrder.state === 'order completed' && 'Commande livrée'}
          </StatusMessage>
          {confirmedOrder.state === 'order confirmed' && (
            <Button onClick={() => handleCancelOrder(confirmedOrder.ID_Order)}>Annuler la commande</Button>
          )}
        </Card>
      ) : (
        <p>Aucune commande en cours.</p>
      )}
    </Container>
  );
}

export default OrderPage;
