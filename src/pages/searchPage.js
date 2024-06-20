import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurantApi } from '../api/api';
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

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const RestaurantList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RestaurantItem = styled.li`
  background: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const RestaurantImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: #ff7f50;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #ff6347;
  }

  @media (max-width: 480px) {
    padding: 8px;
    margin: 8px 0;
  }
`;

function SearchPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await restaurantApi.get('/restaurants', {
          params: { search: searchTerm }
        });
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOrderClick = (ID_Restaurant) => {
    navigate(`/restaurant/${ID_Restaurant}`);
  };

  return (
    <Container>
      <Title>Search Page</Title>
      <Input
        type="text"
        placeholder="Search for a restaurant"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <RestaurantList>
        {restaurants.map((restaurant) => (
          <RestaurantItem key={restaurant._id}>
            <p><strong>ID Restaurant:</strong> {restaurant.ID_Restaurant}</p>
            <p><strong>ID Restaurateur:</strong> {restaurant.ID_Restaurateur}</p>
            <p><strong>Nom Restaurant:</strong> {restaurant.nom_Restaurant}</p>
            {restaurant.image && <RestaurantImage src={`http://localhost:3001/${restaurant.image}`} alt={restaurant.nom_Restaurant} />}
            <Button onClick={() => handleOrderClick(restaurant.ID_Restaurant)}>Commander</Button>
          </RestaurantItem>
        ))}
      </RestaurantList>
    </Container>
  );
}

export default SearchPage;
