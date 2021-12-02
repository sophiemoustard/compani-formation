import AsyncStorage from '@react-native-async-storage/async-storage';
import companiDate from './dates';

type TokenType = {
  token: string | null,
  expiryDate: string | Date | null,
};

const isTokenValid = (token: TokenType['token'], expiryDate: TokenType['expiryDate']): boolean =>
  !!token && companiDate().isBefore(expiryDate || '');

type CompaniTokenType = {
  companiToken: TokenType['token'],
  companiTokenExpiryDate: TokenType['expiryDate'],
}

const getCompaniToken = async (): Promise<CompaniTokenType> => ({
  companiToken: await AsyncStorage.getItem('compani_token'),
  companiTokenExpiryDate: await AsyncStorage.getItem('compani_token_expiry_date'),
});

const setCompaniToken = async (
  token: CompaniTokenType['companiToken'],
  tokenExpireDate: CompaniTokenType['companiTokenExpiryDate']
): Promise<void> => {
  if (token) await AsyncStorage.setItem('compani_token', token);
  if (tokenExpireDate) {
    await AsyncStorage.setItem('compani_token_expiry_date', companiDate(tokenExpireDate).toISOString());
  }
};

const removeCompaniToken = async (): Promise<void> => {
  await AsyncStorage.removeItem('compani_token');
  await AsyncStorage.removeItem('compani_token_expiry_date');
};

type RefreshTokenType = {
  refreshToken: TokenType['token'],
  refreshTokenExpiryDate: TokenType['expiryDate'],
}

const getRefreshToken = async (): Promise<RefreshTokenType> => ({
  refreshToken: await AsyncStorage.getItem('refresh_token'),
  refreshTokenExpiryDate: await AsyncStorage.getItem('refresh_token_expiry_date'),
});

const setRefreshToken = async (refreshToken: RefreshTokenType['refreshToken']): Promise<void> => {
  if (refreshToken) await AsyncStorage.setItem('refresh_token', refreshToken);
  await AsyncStorage.setItem('refresh_token_expiry_date', companiDate().endOf('day').add(1, 'year').toISOString());
};

const removeRefreshToken = async (): Promise<void> => {
  await AsyncStorage.removeItem('refresh_token');
  await AsyncStorage.removeItem('refresh_token_expiry_date');
};

const getUserId = async (): Promise<string | null> => AsyncStorage.getItem('user_id');

const setUserId = async (id: string): Promise<void> => AsyncStorage.setItem('user_id', id);

const removeUserId = async (): Promise<void> => AsyncStorage.removeItem('user_id');

const getExpoToken = async (): Promise<string | null> => AsyncStorage.getItem('expo_token');

const setExpoToken = async (expoToken: string): Promise<void> => AsyncStorage.setItem('expo_token', expoToken);

const removeExpoToken = async (): Promise<void> => AsyncStorage.removeItem('expo_token');

export default {
  isTokenValid,
  getCompaniToken,
  setCompaniToken,
  removeCompaniToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
  getUserId,
  setUserId,
  removeUserId,
  getExpoToken,
  setExpoToken,
  removeExpoToken,
};
