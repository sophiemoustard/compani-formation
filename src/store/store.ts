// @ts-nocheck

import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './main/slice';
import cardsReducer from './cards/slice';

const store = configureStore({ reducer: { main: mainReducer, cards: cardsReducer } });

export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
