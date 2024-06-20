import React, { useState } from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import GlobalStyles from './GlobalStyles';
import Sidebar from './components/common/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ReferFriend from './pages/ReferFriend';
import Orders from './pages/Orders';
import OrderHistory from './pages/OrderHistory';
import Cart from './pages/Cart';
import OrderTracking from './pages/OrderTracking';
import Search from './pages/Search';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import RestaurantPage from './pages/restaurantPage';
import MenuPage from './pages/menuPage';
import ArticlePage from './pages/articlePage';
import SearchPage from './pages/searchPage';
import RestaurantClientPage from './pages/restaurantClientPage';
import OrderPage from './pages/orderPage';
import OrderRequestPage from './pages/orderRequestPage';
import DeliveryRequestPage from './pages/deliveryRequestPage';
import DeliveryTrackingPage from './pages/deliveryTrackingPage';
import TestPage from './pages/testPage';
import TestPage2 from './pages/test2Page';
import { setUser, clearUser, fetchUser } from './features/user/userSlice';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const AppContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left 0.3s ease;
  margin-left: ${({ isOpen }) => (isOpen ? '200px' : '80px')};

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  background-color: #2b3e50;
  color: white;
`;

const NotificationIcon = styled.div`
  position: relative;
  font-size: 24px;
  cursor: pointer;
`;

const NotificationMenu = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background-color: #2b3e50;
  color: white;
  border: 1px solid #34495e;
  border-radius: 5px;
  padding: 10px;
  display: ${props => (props.show ? 'block' : 'none')};
  z-index: 1;
`;

const AppWrapper = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', { username: 'john.doe', password: 'password' });
      const { token } = response.data;
      const decodedToken = jwt.decode(token);
      dispatch(setUser({ name: decodedToken.name, email: decodedToken.email, token }));
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  const handleFetchUser = () => {
    dispatch(fetchUser(1)); // Par exemple, fetch user with id 1
  };

  const location = useLocation();
  const hideSidebarAndTopBar = ['/', '/login', '/signup'].includes(location.pathname);

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        {!hideSidebarAndTopBar && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}
        <ContentContainer isOpen={isSidebarOpen}>
          {!hideSidebarAndTopBar && (
            <TopBar>
              <NotificationIcon onClick={toggleNotifications}>
                <FontAwesomeIcon icon={faBell} />
                <NotificationMenu show={showNotifications}>
                  <p>Notification 1</p>
                  <p>Notification 2</p>
                  <p>Notification 3</p>
                </NotificationMenu>
              </NotificationIcon>
            </TopBar>
          )}
          <MainContent>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/refer" element={<ReferFriend />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order-tracking" element={<OrderTracking />} />
              <Route path="/search" element={<Search />} />
              <Route path="/restaurants" element={<RestaurantPage />} />
              <Route path="/menu/:restaurantId" element={<MenuPage />} />
              <Route path="/articles" element={<ArticlePage />} />
              <Route path="/searchPage" element={<SearchPage />} />
              <Route path="/restaurant/:restaurantId" element={<RestaurantClientPage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/order-requests" element={<OrderRequestPage />} />
              <Route path="/delivery-requests" element={<DeliveryRequestPage />} />
              <Route path="/delivery-tracking" element={<DeliveryTrackingPage />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/test2" element={<TestPage2 />} />
            </Routes>
          </MainContent>
        </ContentContainer>
      </AppContainer>
    </>
  );
};

export default AppWrapper;
