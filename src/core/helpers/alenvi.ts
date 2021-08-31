import Authentication from '../../api/authentication';
import asyncStorage from './asyncStorage';

const refreshAlenviCookies = async (): Promise<boolean> => {
  try {
    const { refreshToken, refreshTokenExpiryDate } = await asyncStorage.getRefreshToken();
    if (refreshToken && asyncStorage.isTokenValid(refreshToken, refreshTokenExpiryDate)) {
      const token = await Authentication.refreshToken({ refreshToken });

      await asyncStorage.setAlenviToken(token.token, token.tokenExpireDate);
      await asyncStorage.setRefreshToken(token.refreshToken);
      await asyncStorage.setUserId(token.user._id);

      return true;
    }
    await asyncStorage.removeAlenviToken();
    await asyncStorage.removeRefreshToken();
    await asyncStorage.removeUserId();

    return false;
  } catch (e: any) {
    console.error(e);
    if ([404, 401].includes(e.response.status)) {
      await asyncStorage.removeAlenviToken();
      await asyncStorage.removeRefreshToken();
      await asyncStorage.removeUserId();
    }

    return false;
  }
};

export default {
  refreshAlenviCookies,
};
