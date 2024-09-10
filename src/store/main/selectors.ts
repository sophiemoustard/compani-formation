import get from 'lodash/get';
import { StateType } from '../store';

export const getLoggedUserId = (state: StateType) => get(state.main, 'loggedUser._id') || null;

export const getUserVendorRole = (state: StateType) => get(state.main, 'loggedUser.role.vendor.name') || '';

export const getLoggedUser = (state: StateType) => get(state.main, 'loggedUser') || null;

export const getStatusBarVisible = (state: StateType) => get(state.main, 'statusBarVisible') || false;
