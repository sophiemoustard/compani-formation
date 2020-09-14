import { AsyncStorage } from 'react-native';
import moment from './moment';

const isTokenValid = (token: string | null, expiryDate: string): boolean => !!token && moment().isBefore(expiryDate);

interface AlenviToken {
  alenviToken: string | null,
  alenviTokenExpiryDate: string | null,
}

const getAlenviToken = async (): Promise<AlenviToken> => ({
  alenviToken: await AsyncStorage.getItem('alenvi_token'),
  alenviTokenExpiryDate: await AsyncStorage.getItem('alenvi_token_expiry_date'),
});

const setAlenviToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem('alenvi_token', token);
  await AsyncStorage.setItem('alenvi_token_expiry_date', moment().endOf('d').add(1, 'day').toISOString());
};

const removeAlenviToken = async (): Promise<void> => {
  await AsyncStorage.removeItem('alenvi_token');
  await AsyncStorage.removeItem('alenvi_token_expiry_date');
};

interface RefreshToken {
  refreshToken: string | null,
  refreshTokenExpiryDate: string | null,
}

const getRefreshToken = async (): Promise<RefreshToken> => ({
  refreshToken: await AsyncStorage.getItem('refresh_token'),
  refreshTokenExpiryDate: await AsyncStorage.getItem('refresh_token_expiry_date'),
});

const setRefreshToken = async (refreshToken: string): Promise<void> => {
  await AsyncStorage.setItem('refresh_token', refreshToken);
  await AsyncStorage.setItem('refresh_token_expiry_date', moment().endOf('d').add(1, 'year').toISOString());
};

const removeRefreshToken = async (): Promise<void> => {
  await AsyncStorage.removeItem('refresh_token');
  await AsyncStorage.removeItem('refresh_token_expiry_date');
};

const getUserId = async (): Promise<string | null> => AsyncStorage.getItem('user_id');

const setUserId = async (id: string): Promise<void> => AsyncStorage.setItem('user_id', id);

const removeUserId = async (): Promise<void> => AsyncStorage.removeItem('user_id');

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
};
