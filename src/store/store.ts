// @ts-nocheck

import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './main/slice';
import { cards } from './cards/reducers';

const store = configureStore({ reducer: { main: mainReducer, cards } });

export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
