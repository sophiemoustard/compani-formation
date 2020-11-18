export const getLoggedUserId = state => (state.main.loggedUser ? state.main.loggedUser._id : null);
export const getUserVendorRole = state => state.main.loggedUser?.role?.vendor?.name || '';
