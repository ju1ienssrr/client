import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  color: white;
`;

const SelectionSection = styled.div`
  position: relative;
  width: 60%;
`;

const SelectionTitle = styled.h1`
  margin-bottom: 10px;
`;

const OrderButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px 30px;
  border: none;
  border-radius: 10px;
  background-color: #f0ad4e;
  color: white;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const SelectionImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const RestaurantsSection = styled.div`
  width: 35%;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
`;

const RestaurantList = styled.div`
  display: flex;
  flex-direction: column;
`;

const RestaurantItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: #34495e;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
`;

const RestaurantImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
`;

const RestaurantName = styled.div`
  font-size: 18px;
`;

const Home = () => {
  return (
    <HomeContainer>
      <SelectionSection>
        <SelectionTitle>Ne ratez pas la sélection du jour!</SelectionTitle>
        <SelectionImage src="selection.jpg" alt="Sélection du jour" />
        <OrderButton as={Link} to="/search">Commander</OrderButton>
      </SelectionSection>
      <RestaurantsSection>
        <SectionTitle>Restaurants proches de chez vous</SectionTitle>
        <RestaurantList>
          <RestaurantItem>
            <RestaurantImage src="restaurant1.jpg" alt="Jefe Burger" />
            <RestaurantName>Jefe Burger</RestaurantName>
          </RestaurantItem>
          <RestaurantItem>
            <RestaurantImage src="restaurant2.jpg" alt="Verratti's Pizzas" />
            <RestaurantName>Verratti's Pizzas</RestaurantName>
          </RestaurantItem>
          <RestaurantItem>
            <RestaurantImage src="restaurant3.jpg" alt="Maurice Bappon pasta" />
            <RestaurantName>Maurice Bappon pasta</RestaurantName>
          </RestaurantItem>
        </RestaurantList>
      </RestaurantsSection>
    </HomeContainer>
  );
};

export default Home;