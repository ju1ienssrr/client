import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { restaurantApi } from '../api/api';

const SearchContainer = styled.div`
  padding: 20px;
  color: white;
  margin: 0 auto;
  width: 80%;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
`;

const ScrollableSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
`;

const ScrollButton = styled.button`
  background-color: #f0ad4e;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  z-index: 2;
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ScrollButtonLeft = styled(ScrollButton)`
  left: 10px;
`;

const ScrollButtonRight = styled(ScrollButton)`
  right: 10px;
`;

const CardContainerWrapper = styled.div`
  overflow: hidden;
  width: 80%;
`;

const CardContainer = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
`;

const Card = styled.div`
  flex: 0 0 auto;
  background-color: #34495e;
  border-radius: 10px;
  margin: 0 10px;
  padding: 10px;
  width: 150px;
  text-align: center;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 120px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
`;

const SearchBar = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border: none;
  border-radius: 5px;
`;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [topRestaurants, setTopRestaurants] = useState([]);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [topCurrentIndex, setTopCurrentIndex] = useState(0);
  const restaurantContainerRef = useRef(null);
  const topRestaurantContainerRef = useRef(null);

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

  useEffect(() => {
    const fetchTopRestaurants = async () => {
      try {
        const response = await restaurantApi.get('/restaurants', {
          params: { limit: 5 }
        });
        setTopRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching top restaurants:', error);
      }
    };

    fetchTopRestaurants();
  }, []);

  const scroll = (direction, indexSetter, currentIndex, dataLength, containerRef) => {
    let newIndex = currentIndex;

    if (direction === 'left') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    } else {
      newIndex = currentIndex < dataLength - 1 ? currentIndex + 1 : dataLength - 1;
    }

    indexSetter(newIndex);
    const scrollAmount = containerRef.current.children[0].offsetWidth + 20; // width of card + margin
    containerRef.current.style.transform = `translateX(-${scrollAmount * newIndex}px)`;
  };

  const handleSelectRestaurant = (ID_Restaurant) => {
    navigate(`/restaurant/${ID_Restaurant}`);
  };

  return (
    <SearchContainer>
      <Title>Recherche</Title>
      <SearchBar
        type="text"
        placeholder="Que voulez-vous manger ?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SectionTitle>Restaurants</SectionTitle>
      <ScrollableSection>
        <ScrollButtonLeft
          onClick={() => scroll('left', setCurrentIndex, currentIndex, restaurants.length, restaurantContainerRef)}
          disabled={currentIndex === 0}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </ScrollButtonLeft>
        <CardContainerWrapper>
          <CardContainer ref={restaurantContainerRef}>
            {restaurants.map((restaurant) => (
              <Card key={restaurant._id} onClick={() => handleSelectRestaurant(restaurant.ID_Restaurant)}>
                <CardImage src={`http://localhost:3001/${restaurant.image}`} alt={restaurant.nom_Restaurant} />
                <CardTitle>{restaurant.nom_Restaurant}</CardTitle>
              </Card>
            ))}
          </CardContainer>
        </CardContainerWrapper>
        <ScrollButtonRight
          onClick={() => scroll('right', setCurrentIndex, currentIndex, restaurants.length, restaurantContainerRef)}
          disabled={currentIndex >= restaurants.length - 5}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </ScrollButtonRight>
      </ScrollableSection>
      <SectionTitle>Sélection pour vous</SectionTitle>
      <ScrollableSection>
        <ScrollButtonLeft
          onClick={() => scroll('left', setTopCurrentIndex, topCurrentIndex, topRestaurants.length, topRestaurantContainerRef)}
          disabled={topCurrentIndex === 0}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </ScrollButtonLeft>
        <CardContainerWrapper>
          <CardContainer ref={topRestaurantContainerRef}>
            {topRestaurants.map((restaurant) => (
              <Card key={restaurant._id}>
                <CardImage src={`http://localhost:3001/${restaurant.image}`} alt={restaurant.nom_Restaurant} />
                <CardTitle>{restaurant.nom_Restaurant}</CardTitle>
              </Card>
            ))}
          </CardContainer>
        </CardContainerWrapper>
        <ScrollButtonRight
          onClick={() => scroll('right', setTopCurrentIndex, topCurrentIndex, topRestaurants.length, topRestaurantContainerRef)}
          disabled={topCurrentIndex >= topRestaurants.length - 5}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </ScrollButtonRight>
      </ScrollableSection>
    </SearchContainer>
  );
};

export default Search;
