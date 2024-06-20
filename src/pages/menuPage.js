import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { restaurantApi } from '../api/api';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  color: #333;
  background: #f7f7f7;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const SubTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li`
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Button = styled.button`
  background-color: #ff7f50;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 10px;

  &:hover {
    background-color: #ff6347;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    margin-top: 5px;
  }
`;

const Input = styled.input`
  width: calc(100% - 22px);
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;

  @media (max-width: 768px) {
    padding: 8px;
    margin: 5px 0;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const ArticleList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
`;

const ArticleItem = styled.li`
  background: #e8e8e8;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

function MenuPage() {
  const { restaurantId } = useParams();
  const [menus, setMenus] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState({});
  const [menuArticles, setMenuArticles] = useState({});
  const [newMenu, setNewMenu] = useState({ menu_Name: '', price: '' });
  const [editingMenu, setEditingMenu] = useState(null);
  const [editedMenu, setEditedMenu] = useState({ menu_Name: '', price: '' });

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await restaurantApi.get(`/menus/${restaurantId}`);
        setMenus(response.data);
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
      setMenuArticles(prevState => ({ ...prevState, [menuId]: response.data }));
    } catch (error) {
      console.error('Error fetching menu articles:', error);
    }
  };

  const handleCreateMenu = async () => {
    try {
      const response = await restaurantApi.post('/menus', { ...newMenu, ID_Restaurant: restaurantId });
      setMenus([...menus, response.data]);
      setNewMenu({ menu_Name: '', price: '' });
    } catch (error) {
      console.error('Error creating menu:', error);
    }
  };

  const handleArticleChange = (menuId, articleId) => {
    setSelectedArticle({ ...selectedArticle, [menuId]: articleId });
  };

  const handleAddArticleToMenu = async (menuId) => {
    const articleId = selectedArticle[menuId];
    if (!articleId) {
      console.error('No article selected');
      return;
    }

    try {
      await restaurantApi.post('/menuArticles', {
        ID_Menu: menuId,
        ID_Article: articleId,
      });
      fetchMenuArticles(menuId);
      console.log('Article added to menu');
    } catch (error) {
      console.error('Error adding article to menu:', error);
    }
  };

  const handleRemoveArticleFromMenu = async (menuId, articleId) => {
    try {
      await restaurantApi.delete(`/menuArticles/${menuId}/${articleId}`);
      fetchMenuArticles(menuId);
      console.log('Article removed from menu');
    } catch (error) {
      console.error('Error removing article from menu:', error);
    }
  };

  const handleDeleteMenu = async (menuId) => {
    try {
      await restaurantApi.delete(`/menus/${menuId}`);
      setMenus(menus.filter(menu => menu.ID_Menu !== menuId));
      console.log('Menu deleted successfully');
    } catch (error) {
      console.error('Error deleting menu:', error);
    }
  };

  const handleEditClick = (menu) => {
    setEditingMenu(menu.ID_Menu);
    setEditedMenu({ menu_Name: menu.menu_Name, price: menu.price });
  };

  const handleUpdateMenu = async (menuId) => {
    try {
      await restaurantApi.put(`/menus/${menuId}`, editedMenu);
      setMenus(menus.map(menu => (menu.ID_Menu === menuId ? { ...menu, ...editedMenu } : menu)));
      setEditingMenu(null);
      setEditedMenu({ menu_Name: '', price: '' });
    } catch (error) {
      console.error('Error updating menu:', error);
    }
  };

  const handleInputChange = (event, setFunction) => {
    const { name, value } = event.target;
    setFunction(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <Container>
      <Title>Menus for Restaurant {restaurantId}</Title>
      {menus.length > 0 ? (
        <MenuList>
          {menus.map((menu) => (
            <MenuItem key={menu.ID_Menu}>
              <p>ID Menu: {menu.ID_Menu}</p>
              <p>Menu Name: {menu.menu_Name}</p>
              <p>Price: {menu.price}</p>
              <Select
                value={selectedArticle[menu.ID_Menu] || ''}
                onChange={(e) => handleArticleChange(menu.ID_Menu, e.target.value)}
              >
                <option value="">Select an article</option>
                {articles
                  .filter((article) => article.ID_Restaurant === parseInt(restaurantId))
                  .map((article) => (
                    <option key={article._id} value={article.ID_Article}>
                      {article.article_Name}
                    </option>
                  ))}
              </Select>
              <Button onClick={() => handleAddArticleToMenu(menu.ID_Menu)}>Add Article to Menu</Button>
              <Button onClick={() => fetchMenuArticles(menu.ID_Menu)}>Show Articles</Button>
              <Button onClick={() => handleDeleteMenu(menu.ID_Menu)}>Delete Menu</Button>
              <Button onClick={() => handleEditClick(menu)}>Edit Menu</Button>
              {editingMenu === menu.ID_Menu && (
                <div>
                  <Input
                    type="text"
                    name="menu_Name"
                    value={editedMenu.menu_Name}
                    onChange={(e) => handleInputChange(e, setEditedMenu)}
                    placeholder="Menu Name"
                  />
                  <Input
                    type="number"
                    name="price"
                    value={editedMenu.price}
                    onChange={(e) => handleInputChange(e, setEditedMenu)}
                    placeholder="Price"
                  />
                  <Button onClick={() => handleUpdateMenu(menu.ID_Menu)}>Update Menu</Button>
                </div>
              )}
              {menuArticles[menu.ID_Menu] && (
                <ArticleList>
                  {menuArticles[menu.ID_Menu].map(article => (
                    <ArticleItem key={article._id}>
                      {article.article_Name}
                      <Button onClick={() => handleRemoveArticleFromMenu(menu.ID_Menu, article.ID_Article)}>Delete</Button>
                    </ArticleItem>
                  ))}
                </ArticleList>
              )}
            </MenuItem>
          ))}
        </MenuList>
      ) : (
        <p>No menus found. Create a new menu below.</p>
      )}
      <div>
        <SubTitle>Create New Menu</SubTitle>
        <Input
          type="text"
          name="menu_Name"
          value={newMenu.menu_Name}
          onChange={(e) => handleInputChange(e, setNewMenu)}
          placeholder="Menu Name"
        />
        <Input
          type="number"
          name="price"
          value={newMenu.price}
          onChange={(e) => handleInputChange(e, setNewMenu)}
          placeholder="Price"
        />
        <Button onClick={handleCreateMenu}>Create Menu</Button>
      </div>
    </Container>
  );
}

export default MenuPage;
