import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import GlobalStyles from './GlobalStyles';
import AppWrapper from './AppWrapper';
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyles />
        <AppWrapper />
      </Router>
    </Provider>
  );
};

export default App;
