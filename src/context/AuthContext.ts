import Authentication from '../api/authentication';
import asyncStorage from '../core/helpers/asyncStorage';
import createDataContext from './createDataContext';
import { navigate } from '../navigationRef';
import Users from '../api/users';
import { BEFORE_SIGNIN, SIGNIN, SIGNIN_ERROR, RESET_ERROR, SIGNOUT, RENDER } from '../core/data/constants';

export interface StateType {
  companiToken: string | null,
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
      return { ...state, loading: false, companiToken: actions.payload };
    case SIGNIN_ERROR:
      return { ...state, loading: false, error: true, errorMessage: actions.payload };
    case RESET_ERROR:
      return { ...state, loading: false, error: false, errorMessage: '' };
    case SIGNOUT:
      return { ...state, companiToken: null, loading: false, error: false, errorMessage: '' };
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
    await asyncStorage.setCompaniToken(authentication.token, authentication.tokenExpireDate);

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

const signOut = dispatch => async (removeExpoToken: boolean = false) => {
  await Authentication.logOut();

  const expoToken = await asyncStorage.getExpoToken();
  const userId = await asyncStorage.getUserId();

  if (removeExpoToken && expoToken && userId) await Users.removeExpoToken(userId, expoToken);

  await asyncStorage.removeCompaniToken();
  await asyncStorage.removeRefreshToken();
  await asyncStorage.removeUserId();
  await asyncStorage.removeExpoToken();

  dispatch({ type: SIGNOUT });
  navigate('Authentication');
};

const refreshCompaniToken = dispatch => async (refreshToken) => {
  try {
    const token = await Authentication.refreshToken({ refreshToken });

    await asyncStorage.setCompaniToken(token.token, token.tokenExpireDate);
    await asyncStorage.setRefreshToken(token.refreshToken);
    await asyncStorage.setUserId(token.user._id);

    dispatch({ type: SIGNIN, payload: token.token });
  } catch (e) {
    signOut(dispatch)();
  }
};

const localSignIn = async (dispatch) => {
  const { companiToken } = await asyncStorage.getCompaniToken();
  dispatch({ type: SIGNIN, payload: companiToken });

  navigate('Courses');
  dispatch({ type: RENDER });
};

const tryLocalSignIn = dispatch => async () => {
  const userId = await asyncStorage.getUserId();
  const { companiToken, companiTokenExpiryDate } = await asyncStorage.getCompaniToken();
  if (userId && asyncStorage.isTokenValid(companiToken, companiTokenExpiryDate)) return localSignIn(dispatch);

  const { refreshToken, refreshTokenExpiryDate } = await asyncStorage.getRefreshToken();
  if (asyncStorage.isTokenValid(refreshToken, refreshTokenExpiryDate)) {
    await refreshCompaniToken(dispatch)(refreshToken);
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
  { signIn, tryLocalSignIn, signOut, resetError, refreshCompaniToken },
  { companiToken: null, loading: false, error: false, errorMessage: '', appIsReady: false }
);
