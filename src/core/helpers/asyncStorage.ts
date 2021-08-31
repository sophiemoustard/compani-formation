import AsyncStorage from '@react-native-async-storage/async-storage';
import companiDate from './dates';

type TokenType = {
  token: string | null,
  expiryDate: string | Date | null,
};

const isTokenValid = (token: TokenType['token'], expiryDate: TokenType['expiryDate']): boolean =>
  !!token && companiDate().isBefore(expiryDate || '');

type AlenviTokenType = {
  alenviToken: TokenType['token'],
  alenviTokenExpiryDate: TokenType['expiryDate'],
}

const getAlenviToken = async (): Promise<AlenviTokenType> => ({
  alenviToken: await AsyncStorage.getItem('alenvi_token'),
  alenviTokenExpiryDate: await AsyncStorage.getItem('alenvi_token_expiry_date'),
});

const setAlenviToken = async (
  token: AlenviTokenType['alenviToken'],
  tokenExpireDate: AlenviTokenType['alenviTokenExpiryDate']
): Promise<void> => {
  if (token) await AsyncStorage.setItem('alenvi_token', token);
  if (tokenExpireDate) {
    await AsyncStorage.setItem('alenvi_token_expiry_date', companiDate(tokenExpireDate).toISOString());
  }
};

const removeAlenviToken = async (): Promise<void> => {
  await AsyncStorage.removeItem('alenvi_token');
  await AsyncStorage.removeItem('alenvi_token_expiry_date');
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
  await AsyncStorage.setItem('refresh_token_expiry_date', companiDate().endOf('days').add(1, 'year').toISOString());
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
  getAlenviToken,
  setAlenviToken,
  removeAlenviToken,
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
