import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './main/slice';
import cardsReducer from './cards/slice';
import attendanceSheetsReducer from './attendanceSheets/slice';

const store = configureStore({
  reducer: { main: mainReducer, cards: cardsReducer, attendanceSheets: attendanceSheetsReducer },
});

export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
