export const getLoggedUserId = state => (state.main.loggedUser ? state.main.loggedUser._id : null);
export const getUserRole = state => state.main.userRole || null;
