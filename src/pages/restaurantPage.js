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

const Button = styled.button`
  background-color: #ff7f50;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  margin: 5px;

  &:hover {
    background-color: #ff6347;
  }
`;

const Form = styled.form`
  background: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
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
`;

const RestaurantDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const RestaurantImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

function RestaurantPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [editingRestaurantId, setEditingRestaurantId] = useState(null);
  const [editedRestaurant, setEditedRestaurant] = useState({ ID_Restaurateur: '', nom_Restaurant: '', adresse: '', image: null });
  const [newRestaurant, setNewRestaurant] = useState({ ID_Restaurateur: '', nom_Restaurant: '', adresse: '', image: null });

  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await restaurantApi.get('/restaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleInputChange = (event, setRestaurant) => {
    const { name, value } = event.target;
    setRestaurant(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (event, setRestaurant) => {
    setRestaurant(prevState => ({ ...prevState, image: event.target.files[0] }));
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('ID_Restaurateur', newRestaurant.ID_Restaurateur);
    formData.append('nom_Restaurant', newRestaurant.nom_Restaurant);
    formData.append('adresse', newRestaurant.adresse);
    if (newRestaurant.image) {
      formData.append('image', newRestaurant.image);
    }

    try {
      const response = await restaurantApi.post('/restaurants', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setRestaurants([...restaurants, response.data]);
      setNewRestaurant({ ID_Restaurateur: '', nom_Restaurant: '', adresse: '', image: null });
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  };

  const handleEditClick = (restaurant) => {
    setEditingRestaurantId(restaurant._id);
    setEditedRestaurant({ ...restaurant });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('ID_Restaurateur', editedRestaurant.ID_Restaurateur);
    formData.append('nom_Restaurant', editedRestaurant.nom_Restaurant);
    formData.append('adresse', editedRestaurant.adresse);
    if (editedRestaurant.image) {
      formData.append('image', editedRestaurant.image);
    }

    try {
      const response = await restaurantApi.put(`/restaurants/${editedRestaurant._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setRestaurants(restaurants.map(r => r._id === editedRestaurant._id ? response.data : r));
      setEditingRestaurantId(null);
      setEditedRestaurant({ ID_Restaurateur: '', nom_Restaurant: '', adresse: '', image: null });
    } catch (error) {
      console.error('Error updating restaurant:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await restaurantApi.delete(`/restaurants/${id}`);
      setRestaurants(restaurants.filter(r => r._id !== id));
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const handleMenuClick = (restaurantId) => {
    navigate(`/menu/${restaurantId}`);
  };

  const handleArticlesClick = () => {
    navigate(`/articles`);
  };

  return (
    <Container>
      <Title>Restaurants</Title>
      <Button onClick={fetchRestaurants}>Get Restaurants</Button>
      <RestaurantList>
        {restaurants.map((restaurant) => (
          <RestaurantItem key={restaurant._id}>
            <RestaurantDetails>
              <p><strong>ID Restaurant:</strong> {restaurant.ID_Restaurant}</p>
              <p><strong>ID Restaurateur:</strong> {restaurant.ID_Restaurateur}</p>
              <p><strong>Nom Restaurant:</strong> {restaurant.nom_Restaurant}</p>
              <p><strong>Adresse:</strong> {restaurant.adresse}</p>
              {restaurant.image && <RestaurantImage src={`http://localhost:3001/${restaurant.image}`} alt={restaurant.nom_Restaurant} />}
              <Button onClick={() => handleEditClick(restaurant)}>Edit</Button>
              <Button onClick={() => handleDelete(restaurant._id)}>Delete</Button>
              <Button onClick={() => handleMenuClick(restaurant.ID_Restaurant)}>Menu</Button>
              {editingRestaurantId === restaurant._id && (
                <Form onSubmit={handleUpdate}>
                  <FormGroup>
                    <Label>ID Restaurateur:</Label>
                    <Input
                      type="text"
                      name="ID_Restaurateur"
                      value={editedRestaurant.ID_Restaurateur}
                      onChange={(e) => handleInputChange(e, setEditedRestaurant)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Nom Restaurant:</Label>
                    <Input
                      type="text"
                      name="nom_Restaurant"
                      value={editedRestaurant.nom_Restaurant}
                      onChange={(e) => handleInputChange(e, setEditedRestaurant)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Adresse:</Label>
                    <Input
                      type="text"
                      name="adresse"
                      value={editedRestaurant.adresse}
                      onChange={(e) => handleInputChange(e, setEditedRestaurant)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Image:</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setEditedRestaurant)}
                    />
                  </FormGroup>
                  <Button type="submit">Save</Button>
                </Form>
              )}
            </RestaurantDetails>
          </RestaurantItem>
        ))}
      </RestaurantList>

      <Button onClick={handleArticlesClick}>Articles</Button>

      <Title>Add a New Restaurant</Title>
      <Form onSubmit={handleCreateSubmit}>
        <FormGroup>
          <Label>ID Restaurateur:</Label>
          <Input
            type="text"
            name="ID_Restaurateur"
            value={newRestaurant.ID_Restaurateur}
            onChange={(e) => handleInputChange(e, setNewRestaurant)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Nom Restaurant:</Label>
          <Input
            type="text"
            name="nom_Restaurant"
            value={newRestaurant.nom_Restaurant}
            onChange={(e) => handleInputChange(e, setNewRestaurant)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Adresse:</Label>
          <Input
            type="text"
            name="adresse"
            value={newRestaurant.adresse}
            onChange={(e) => handleInputChange(e, setNewRestaurant)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Image:</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setNewRestaurant)}
          />
        </FormGroup>
        <Button type="submit">Add Restaurant</Button>
      </Form>
    </Container>
  );
}

export default RestaurantPage;