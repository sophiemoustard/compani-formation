import Users from '../../api/users';
import asyncStorage from './asyncStorage';

const refreshAlenviCookies = async () => {
  try {
    const { refreshToken, refreshTokenExpiryDate } = await asyncStorage.getRefreshToken();
    if (asyncStorage.isTokenValid(refreshToken, refreshTokenExpiryDate)) {
      const token = await Users.refreshToken({ refreshToken });
      await asyncStorage.setAlenviToken(token.token);
      await asyncStorage.setRefreshToken(token.refreshToken);
      await asyncStorage.setUserId(token.user._id);

      return true;
    }
    await asyncStorage.removeAlenviToken();
    await asyncStorage.removeRefreshToken();
    await asyncStorage.removeUserId();

    return false;
  } catch (e) {
    console.error(e);
    if (e.response.status === 404) {
      await asyncStorage.removeAlenviToken();
      await asyncStorage.removeRefreshToken();
      await asyncStorage.removeUserId();
    }

    return false;
  }
};

export default {
  refreshAlenviCookies,
}