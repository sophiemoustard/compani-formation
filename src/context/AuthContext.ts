import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import Users from '../api/users';
import { navigate } from '../navigationRef';

export interface StateType {
  alenviToken: string | null,
  loading: boolean,
  error: boolean,
  errorMessage: string,
  appIsReady: boolean
}

const authReducer = (state: StateType, actions): StateType => {
  switch (actions.type) {
    case 'beforeSignin':
      return { ...state, error: false, errorMessage: '', loading: true };
    case 'signin':
      return { ...state, loading: false, alenviToken: actions.payload };
    case 'signinError':
      return { ...state, loading: false, error: true, errorMessage: actions.payload };
    case 'resetError':
      return { ...state, loading: false, error: false, errorMessage: '' };
    case 'signout':
      return { ...state, alenviToken: null, loading: false, error: false, errorMessage: '' };
    case 'render':
      return { ...state, appIsReady: true };
    default:
      return state;
  }
};

const signIn = dispatch => async ({ email, password }) => {
  try {
    if (!email || !password) return;

    dispatch({ type: 'beforeSignin' });
    const authentication = await Users.authenticate({ email, password });

    await AsyncStorage.setItem('alenvi_token', authentication.token);
    await AsyncStorage.setItem('user_id', authentication.user._id);
    await AsyncStorage.setItem('refresh_token', authentication.refreshToken);

    dispatch({ type: 'signin', payload: authentication.token });
    navigate('Home', { screen: 'Courses', params: { screen: 'CourseList' } });
  } catch (e) {
    dispatch({
      type: 'signinError',
      payload: e.response.status === 401
        ? 'L\'email et/ou le mot de passe est incorrect.'
        : 'Impossible de se connecter',
    });
  }
};

const signOut = dispatch => async () => {
  await AsyncStorage.removeItem('alenvi_token');
  dispatch({ type: 'signout' });
  navigate('Authentication');
};

const refreshAlenviToken = async (refreshToken, dispatch) => {
  try {
    const token = await Users.refreshToken({ refreshToken });

    await AsyncStorage.setItem('alenvi_token', token.token);
    await AsyncStorage.setItem('user_id', token.user._id);
    await AsyncStorage.setItem('refresh_token', token.refresh_token);
  } catch (e) {
    signOut(dispatch)();
  }
};

const tryLocalSignIn = dispatch => async () => {
  const refreshToken = await AsyncStorage.getItem('refresh_token');
  if (refreshToken) await refreshAlenviToken(refreshToken, dispatch);

  const alenviToken = await AsyncStorage.getItem('alenvi_token');
  if (alenviToken) {
    dispatch({ type: 'signin', payload: alenviToken });
    navigate('Home', { screen: 'Courses', params: { screen: 'CourseList' } });
  }
  dispatch({ type: 'render' });
};

const resetError = dispatch => () => {
  dispatch({ type: 'resetError' });
};

export const { Provider, Context }: any = createDataContext(
  authReducer,
  { signIn, tryLocalSignIn, signOut, resetError },
  { alenviToken: null, loading: false, error: false, errorMessage: '', appIsReady: false }
);
