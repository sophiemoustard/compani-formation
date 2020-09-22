export const getLoggedUserId = state => (state.main.loggedUser ? state.main.loggedUser._id : null);
