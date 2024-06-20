// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice'; // Importez votre reducer utilisateur

export const store = configureStore({
  reducer: {
    user: userReducer, // Ajoutez votre reducer ici
  },
});

export default store;
