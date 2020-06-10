import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import Users from '../api/users';
import { navigate } from '../navigationRef';

const authReducer = (state, actions) => {
  switch (actions.type) {
    case 'signin':
      return { ...state, token: actions.payload };
    default:
      return state;
  }
};

const signIn = dispatch => async ({ email, password }) => {
  const authentication = await Users.authenticate({ email, password });
  await AsyncStorage.setItem('token', authentication.token);
  dispatch({ type: 'signin', payload: authentication.token });
  navigate('CourseList');
};

const tryLocalSignIn = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token });
    navigate('CourseList');
  } else navigate('Authentication');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, tryLocalSignIn },
  { token: null }
);
