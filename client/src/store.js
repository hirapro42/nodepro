import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // adjust path if needed

const store = configureStore({
  reducer: rootReducer,
  devTools: true, // enables Redux DevTools by default
});

export default store;
