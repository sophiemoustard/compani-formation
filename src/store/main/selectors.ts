import get from 'lodash/get';
import { RootState } from '../store';

export const getLoggedUserId = (state: RootState) => get(state.main, 'loggedUser._id') || null;

export const getUserVendorRole = (state: RootState) => get(state.main, 'loggedUser.role.vendor.name') || '';
