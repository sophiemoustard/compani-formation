import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pick } from 'lodash';

type MainStateType = {
  loggedUser: object | null,
  statusBarVisible: boolean,
}

const initialState: MainStateType = { loggedUser: null, statusBarVisible: true };

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setLoggedUser: (state, action) => ({
      ...state,
      loggedUser: pick(action.payload, [
        '_id',
        'identity.firstname',
        'identity.lastname',
        'local.email',
        'picture.link',
        'company.name',
        'contact.phone',
        'role',
        'companyLinkRequest',
      ]),
    }),
    setStatusBarVisible: (state, action: PayloadAction<boolean>) => (
      { ...state, statusBarVisible: action.payload }
    ),
    resetMainReducer: () => initialState,
  },
});

export const { setLoggedUser, setStatusBarVisible, resetMainReducer } = mainSlice.actions;

export default mainSlice.reducer;
