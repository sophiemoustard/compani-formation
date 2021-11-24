import Authentication from '../api/authentication';
import asyncStorage from '../core/helpers/asyncStorage';
import createDataContext from './createDataContext';
import { navigate } from '../navigationRef';
import Users from '../api/users';
import { BEFORE_SIGNIN, SIGNIN, SIGNIN_ERROR, RESET_ERROR, SIGNOUT, RENDER } from '../core/data/constants';

export interface StateType {
  alenviToken: string | null,
  loading: boolean,
  error: boolean,
  errorMessage: string,
  appIsReady: boolean
}

const authReducer = (state: StateType, actions): StateType => {
  switch (actions.type) {
    case BEFORE_SIGNIN:
      return { ...state, error: false, errorMessage: '', loading: true };
    case SIGNIN:
      return { ...state, loading: false, alenviToken: actions.payload };
    case SIGNIN_ERROR:
      return { ...state, loading: false, error: true, errorMessage: actions.payload };
    case RESET_ERROR:
      return { ...state, loading: false, error: false, errorMessage: '' };
    case SIGNOUT:
      return { ...state, alenviToken: null, loading: false, error: false, errorMessage: '' };
    case RENDER:
      return { ...state, appIsReady: true };
    default:
      return state;
  }
};

const signIn = dispatch => async ({ email, password }) => {
  try {
    if (!email || !password) return;

    dispatch({ type: BEFORE_SIGNIN });
    const authentication = await Authentication.authenticate({ email, password });

    await asyncStorage.setUserId(authentication.user._id);
    await asyncStorage.setRefreshToken(authentication.refreshToken);
    await asyncStorage.setAlenviToken(authentication.token, authentication.tokenExpireDate);

    dispatch({ type: SIGNIN, payload: authentication.token });
  } catch (e: any) {
    dispatch({
      type: SIGNIN_ERROR,
      payload: e.response.status === 401
        ? 'L\'e-mail et/ou le mot de passe est incorrect.'
        : 'Impossible de se connecter',
    });
  }
};

const signOut = dispatch => async () => {
  await Authentication.logOut();

  const expoToken = await asyncStorage.getExpoToken();
  const userId = await asyncStorage.getUserId();

  if (expoToken && userId) await Users.removeExpoToken(userId, expoToken);

  await asyncStorage.removeAlenviToken();
  await asyncStorage.removeRefreshToken();
  await asyncStorage.removeUserId();
  await asyncStorage.removeExpoToken();

  dispatch({ type: SIGNOUT });
  navigate('Authentication');
};

const refreshAlenviToken = dispatch => async (refreshToken) => {
  try {
    const token = await Authentication.refreshToken({ refreshToken });

    await asyncStorage.setAlenviToken(token.token, token.tokenExpireDate);
    await asyncStorage.setRefreshToken(token.refreshToken);
    await asyncStorage.setUserId(token.user._id);

    dispatch({ type: SIGNIN, payload: token.token });
  } catch (e) {
    signOut(dispatch)();
  }
};

const localSignIn = async (dispatch) => {
  const { alenviToken } = await asyncStorage.getAlenviToken();
  dispatch({ type: SIGNIN, payload: alenviToken });

  navigate('Courses');
  dispatch({ type: RENDER });
};

const tryLocalSignIn = dispatch => async () => {
  const userId = await asyncStorage.getUserId();
  const { alenviToken, alenviTokenExpiryDate } = await asyncStorage.getAlenviToken();
  if (userId && asyncStorage.isTokenValid(alenviToken, alenviTokenExpiryDate)) return localSignIn(dispatch);

  const { refreshToken, refreshTokenExpiryDate } = await asyncStorage.getRefreshToken();
  if (asyncStorage.isTokenValid(refreshToken, refreshTokenExpiryDate)) {
    await refreshAlenviToken(dispatch)(refreshToken);
    return localSignIn(dispatch);
  }

  dispatch({ type: RENDER });
  return signOut(dispatch)();
};

const resetError = dispatch => () => {
  dispatch({ type: RESET_ERROR });
};

export const { Provider, Context }: any = createDataContext(
  authReducer,
  { signIn, tryLocalSignIn, signOut, resetError, refreshAlenviToken },
  { alenviToken: null, loading: false, error: false, errorMessage: '', appIsReady: false }
);
