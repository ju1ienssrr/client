import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { restaurantApi, cartApi } from '../api/api';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const MenuGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const MenuItem = styled.div`
  background: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  width: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const MenuTitle = styled.h2`
  margin: 10px 0;
  font-size: 18px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #ff7f50;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #ff6347;
  }
`;

const ArticleList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
  text-align: left;
`;

const ArticleItem = styled.li`
  background: #e8e8e8;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function RestaurantClientPage() {
  const { restaurantId } = useParams();
  const [menus, setMenus] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState({});
  const [menuArticles, setMenuArticles] = useState({});
  const [clientId, setClientId] = useState(1); // Remplacer par l'ID du client réel

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await restaurantApi.get(`/menus/${restaurantId}`);
        const fetchedMenus = response.data;
        setMenus(fetchedMenus);

        // Fetch articles for each menu
        fetchedMenus.forEach(async (menu) => {
          await fetchMenuArticles(menu.ID_Menu);
        });
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    const fetchArticles = async () => {
      try {
        const response = await restaurantApi.get('/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchMenus();
    fetchArticles();
  }, [restaurantId]);

  const fetchMenuArticles = async (menuId) => {
    try {
      const response = await restaurantApi.get(`/menuArticles/${menuId}`);
      setMenuArticles((prevState) => ({ ...prevState, [menuId]: response.data }));
    } catch (error) {
      console.error('Error fetching menu articles:', error);
    }
  };

  const handleArticleChange = (menuId, articleId) => {
    setSelectedArticle({ ...selectedArticle, [menuId]: articleId });
  };

  const handleAddToCart = async (menuId, articleId) => {
    if (!articleId) {
      console.error('No article selected');
      return;
    }

    const article = articles.find((a) => a.ID_Article === articleId);
    const price = article ? article.price : 0;

    try {
      await cartApi.post('/carts', {
        ID_Client: clientId,
        ID_Restaurant: parseInt(restaurantId, 10), // Assurez-vous que l'ID du restaurant est un nombre
        ID_Article: articleId,
        price: price, // Assurez-vous de transmettre le prix de l'article
      });
      console.log('Article added to cart');
    } catch (error) {
      console.error('Error adding article to cart:', error);
    }
  };

  return (
    <Container>
      <Title>Menus for Restaurant {restaurantId}</Title>
      {menus.length > 0 ? (
        <MenuGrid>
          {menus.map((menu) => (
            <MenuItem key={menu.ID_Menu}>
              {menuArticles[menu.ID_Menu] && menuArticles[menu.ID_Menu][0] && (
                <CardImage
                  src={`http://localhost:3001/${menuArticles[menu.ID_Menu][0].image}`}
                  alt={menuArticles[menu.ID_Menu][0].article_Name}
                />
              )}
              <MenuTitle>Menu ID: {menu.ID_Menu}</MenuTitle>
              <Select
                value={selectedArticle[menu.ID_Menu] || ''}
                onChange={(e) => handleArticleChange(menu.ID_Menu, e.target.value)}
              >
                <option value="">Select an article</option>
                {articles.map((article) => (
                  <option key={article._id} value={article.ID_Article}>
                    {article.article_Name}
                  </option>
                ))}
              </Select>
              <Button onClick={() => handleAddToCart(menu.ID_Menu, selectedArticle[menu.ID_Menu])}>
                Ajouter au panier
              </Button>
              <ArticleList>
                {menuArticles[menu.ID_Menu] &&
                  menuArticles[menu.ID_Menu].map((article) => (
                    <ArticleItem key={article._id}>
                      {article.article_Name}
                      <Button onClick={() => handleAddToCart(menu.ID_Menu, article.ID_Article)}>
                        Ajouter au panier
                      </Button>
                    </ArticleItem>
                  ))}
              </ArticleList>
            </MenuItem>
          ))}
        </MenuGrid>
      ) : (
        <p>No menus found for this restaurant.</p>
      )}
    </Container>
  );
}

export default RestaurantClientPage;
