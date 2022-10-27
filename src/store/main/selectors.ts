import get from 'lodash/get';
import { MainStateType } from '../../types/store/MainStoreType';

export const getLoggedUserId = (state: { main: MainStateType }) => get(state.main, 'loggedUser._id') || null;

export const getUserVendorRole = (state: { main: MainStateType }) =>
  get(state.main, 'loggedUser.role.vendor.name') || '';
