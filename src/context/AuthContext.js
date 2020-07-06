import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import Users from '../api/users';
import { navigate } from '../navigationRef';

const authReducer = (state, actions) => {
  switch (actions.type) {
    case 'signin':
      return { ...state, token: actions.payload };
    case 'signout':
      return { ...state, token: null };
    default:
      return state;
  }
};

const signIn = dispatch => async ({ email, password }) => {
  try {
    const authentication = await Users.authenticate({ email, password });
    await AsyncStorage.setItem('token', authentication.token);
    dispatch({ type: 'signin', payload: authentication.token });
    navigate('Home', { screen: 'CourseList' });
  } catch (e) {
    if (e.response.status === 401) return 'L\'email et/ou le mot de passe est incorrect.' ;
    else return 'Impossible de se connecter';
  }
};

const signOut = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });
  navigate('Authentication');
};

const tryLocalSignIn = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token });
    navigate('Home', { screen: 'CourseList' });
  } else navigate('Authentication');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, tryLocalSignIn, signOut },
  { token: null }
);
