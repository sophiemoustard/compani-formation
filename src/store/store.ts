// @ts-nocheck

import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './main/slice';
import { cards } from './cards/reducers';

const store = configureStore({
  reducer: {
    main: mainReducer,
    cards,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
