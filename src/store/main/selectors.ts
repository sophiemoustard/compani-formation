import { RootState } from '../store';

export const getLoggedUserId = (state: RootState) => state.main.loggedUser?._id || null;

export const getUserVendorRole = (state: RootState) => state.main.loggedUser?.role?.vendor?.name || '';
