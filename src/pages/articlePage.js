import React, { useState, useEffect } from 'react';
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

const SubTitle = styled.h2`
  margin-bottom: 20px;
`;

const ArticleList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ArticleItem = styled.li`
  background: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ArticleDetails = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const ArticleImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
`;

const ArticleActions = styled.div`
  display: flex;
  gap: 10px;
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

const Form = styled.form`
  margin-top: 20px;
  background: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Error = styled.p`
  color: red;
  margin-top: 10px;
`;

function ArticlePage() {
  const [articles, setArticles] = useState([]);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [editedArticle, setEditedArticle] = useState({ article_Name: '', image: null, price: '', ID_Restaurant: '' });
  const [newArticle, setNewArticle] = useState({ article_Name: '', image: null, price: '', ID_Restaurant: '' });
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await restaurantApi.get('/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    const fetchRestaurants = async () => {
      try {
        const response = await restaurantApi.get('/restaurants?ID_Restaurateur=1');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchArticles();
    fetchRestaurants();
  }, []);

  const handleInputChange = (event, setArticle) => {
    const { name, value } = event.target;
    setArticle(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (event, setArticle) => {
    setArticle(prevState => ({ ...prevState, image: event.target.files[0] }));
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    if (!newArticle.article_Name || !newArticle.price || !newArticle.ID_Restaurant) {
      setError('Please fill out all fields.');
      return;
    }
    const formData = new FormData();
    formData.append('article_Name', newArticle.article_Name);
    formData.append('price', newArticle.price);
    formData.append('ID_Restaurant', newArticle.ID_Restaurant);
    if (newArticle.image) {
      formData.append('image', newArticle.image);
    }

    try {
      const response = await restaurantApi.post('/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setArticles([...articles, response.data]);
      setNewArticle({ article_Name: '', image: null, price: '', ID_Restaurant: '' });
      setError('');
    } catch (error) {
      setError('Error creating article.');
      console.error('Error creating article:', error);
    }
  };

  const handleEditClick = (article) => {
    setEditingArticleId(article._id);
    setEditedArticle({ ...article });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!editedArticle.article_Name || !editedArticle.price || !editedArticle.ID_Restaurant) {
      setError('Please fill out all fields.');
      return;
    }
    const formData = new FormData();
    formData.append('article_Name', editedArticle.article_Name);
    formData.append('price', editedArticle.price);
    formData.append('ID_Restaurant', editedArticle.ID_Restaurant);
    if (editedArticle.image) {
      formData.append('image', editedArticle.image);
    }

    try {
      const response = await restaurantApi.put(`/articles/${editedArticle._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setArticles(articles.map(a => a._id === editedArticle._id ? response.data : a));
      setEditingArticleId(null);
      setEditedArticle({ article_Name: '', image: null, price: '', ID_Restaurant: '' });
      setError('');
    } catch (error) {
      setError('Error updating article.');
      console.error('Error updating article:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await restaurantApi.delete(`/articles/${id}`);
      setArticles(articles.filter(a => a._id !== id));
    } catch (error) {
      setError('Error deleting article.');
      console.error('Error deleting article:', error);
    }
  };

  return (
    <Container>
      <Title>Articles</Title>
      <ArticleList>
        {articles.map((article) => (
          <ArticleItem key={article._id}>
            {article.image && <ArticleImage src={`http://localhost:3001/${article.image}`} alt={article.article_Name} />}
            <ArticleDetails>
              <p>ID Article: {article.ID_Article}</p>
              <p>Article Name: {article.article_Name}</p>
              <p>Price: {article.price}</p>
              <p>Restaurant ID: {article.ID_Restaurant}</p>
            </ArticleDetails>
            <ArticleActions>
              <Button onClick={() => handleEditClick(article)}>Edit</Button>
              <Button onClick={() => handleDelete(article._id)}>Delete</Button>
            </ArticleActions>
            {editingArticleId === article._id && (
              <Form onSubmit={handleUpdate}>
                <FormGroup>
                  <Label>Article Name:</Label>
                  <Input
                    type="text"
                    name="article_Name"
                    value={editedArticle.article_Name}
                    onChange={(e) => handleInputChange(e, setEditedArticle)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Price:</Label>
                  <Input
                    type="number"
                    name="price"
                    value={editedArticle.price}
                    onChange={(e) => handleInputChange(e, setEditedArticle)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Restaurant:</Label>
                  <Select
                    name="ID_Restaurant"
                    value={editedArticle.ID_Restaurant}
                    onChange={(e) => handleInputChange(e, setEditedArticle)}
                  >
                    <option value="">Select a restaurant</option>
                    {restaurants.map((restaurant) => (
                      <option key={restaurant.ID_Restaurant} value={restaurant.ID_Restaurant}>
                        {restaurant.nom_Restaurant}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label>Image:</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setEditedArticle)}
                  />
                </FormGroup>
                <Button type="submit">Save</Button>
                {error && <Error>{error}</Error>}
              </Form>
            )}
          </ArticleItem>
        ))}
      </ArticleList>

      <SubTitle>Add a New Article</SubTitle>
      <Form onSubmit={handleCreateSubmit}>
        <FormGroup>
          <Label>Article Name:</Label>
          <Input
            type="text"
            name="article_Name"
            value={newArticle.article_Name}
            onChange={(e) => handleInputChange(e, setNewArticle)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Price:</Label>
          <Input
            type="number"
            name="price"
            value={newArticle.price}
            onChange={(e) => handleInputChange(e, setNewArticle)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Restaurant:</Label>
          <Select
            name="ID_Restaurant"
            value={newArticle.ID_Restaurant}
            onChange={(e) => handleInputChange(e, setNewArticle)}
          >
            <option value="">Select a restaurant</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant.ID_Restaurant} value={restaurant.ID_Restaurant}>
                {restaurant.nom_Restaurant}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Image:</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setNewArticle)}
          />
        </FormGroup>
        <Button type="submit">Add Article</Button>
        {error && <Error>{error}</Error>}
      </Form>
    </Container>
  );
}

export default ArticlePage;
